/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.facebook.litho;

import static android.content.Context.ACCESSIBILITY_SERVICE;
import static com.facebook.litho.AccessibilityUtils.isAccessibilityEnabled;
import static com.facebook.litho.ThreadUtils.assertMainThread;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityManager;
import androidx.annotation.Nullable;
import androidx.annotation.VisibleForTesting;
import androidx.core.view.accessibility.AccessibilityManagerCompat;
import androidx.core.view.accessibility.AccessibilityManagerCompat.AccessibilityStateChangeListenerCompat;
import com.facebook.infer.annotation.ThreadConfined;
import com.facebook.litho.animation.AnimatedProperties;
import com.facebook.litho.animation.AnimatedProperty;
import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.rendercore.visibility.VisibilityMountExtension;
import java.lang.ref.WeakReference;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/** A {@link ViewGroup} that can host the mounted state of a {@link Component}. */
public class LithoView extends BaseMountingView {

  public static final String ZERO_HEIGHT_LOG = "LithoView:0-height";
  public static final String SET_ALREADY_ATTACHED_COMPONENT_TREE =
      "LithoView:SetAlreadyAttachedComponentTree";
  private static final String LITHO_LIFECYCLE_FOUND = "lithoView:LithoLifecycleProviderFound";

  private static final String TAG = LithoView.class.getSimpleName();

  private @Nullable LithoLifecycleProvider mLifecycleProvider;

  private final Rect mCachedCorrectedVisibleRect = new Rect();
  private final Rect mScrollPositionChangedRect = new Rect();
  private final Rect mLastScrollPositionChangedRect = new Rect();

  private @Nullable ComponentTree mComponentTree;
  private final ComponentContext mComponentContext;
  private boolean mIsAttached;
  private boolean mIsAttachedForTest;
  // The bounds of the visible rect that was used for the previous incremental mount.

  private boolean mForceLayout;
  private boolean mSuppressMeasureComponentTree;
  private boolean mIsMeasuring = false;
  private boolean mHasNewComponentTree = false;
  private OnDirtyMountListener mOnDirtyMountListener = null;
  private @Nullable OnPostDrawListener mOnPostDrawListener = null;

  private final AccessibilityManager mAccessibilityManager;

  private final AccessibilityStateChangeListener mAccessibilityStateChangeListener =
      new AccessibilityStateChangeListener(this);

  private static final int[] sLayoutSize = new int[2];

  // Keep ComponentTree when detached from this view in case the ComponentTree is shared between
  // sticky header and RecyclerView's binder
  // TODO T14859077 Replace with proper solution
  private @Nullable ComponentTree mTemporaryDetachedComponentTree;
  private boolean mDoMeasureInLayout;
  private @Nullable Map<String, ComponentLogParams> mInvalidStateLogParams;
  private @Nullable String mPreviousComponentSimpleName;
  private @Nullable String mNullComponentCause;
  private @Nullable MountStartupLoggingInfo mMountStartupLoggingInfo;
  private @Nullable TreeState.TreeMountInfo mMountInfo;
  public final int mViewAttributeFlags;

  /**
   * Create a new {@link LithoView} instance and initialize it with the given {@link Component}
   * root.
   *
   * @param context Android {@link Context}.
   * @param component The root component to draw.
   * @return {@link LithoView} able to render a {@link Component} hierarchy.
   */
  public static LithoView create(Context context, Component component) {
    final LithoView lithoView = new LithoView(context);
    lithoView.setComponentTree(
        ComponentTree.create(new ComponentContext(context), component).build());
    return lithoView;
  }

  public static LithoView create(
      Context context, Component component, LithoLifecycleProvider lifecycleProvider) {
    return create(new ComponentContext(context), component, lifecycleProvider);
  }

  /**
   * Create a new {@link LithoView} instance and initialize it with the given {@link Component}
   * root.
   *
   * @param context {@link ComponentContext}.
   * @param component The root component to draw.
   * @return {@link LithoView} able to render a {@link Component} hierarchy.
   */
  public static LithoView create(ComponentContext context, Component component) {
    final LithoView lithoView = new LithoView(context);
    lithoView.setComponentTree(ComponentTree.create(context, component).build());
    return lithoView;
  }

  /**
   * Creates a new LithoView and sets a new ComponentTree on it. The ComponentTree is subscribed to
   * the given LithoLifecycleProvider instance.
   */
  public static LithoView create(
      ComponentContext context, Component component, LithoLifecycleProvider lifecycleProvider) {
    final LithoView lithoView = new LithoView(context);
    lithoView.setComponentTree(ComponentTree.create(context, component, lifecycleProvider).build());
    return lithoView;
  }
  /**
   * Create a new {@link LithoView} instance and initialize it with a custom {@link ComponentTree}.
   */
  public static LithoView create(Context context, ComponentTree componentTree) {
    return create(new ComponentContext(context), componentTree);
  }

  /**
   * Create a new {@link LithoView} instance and initialize it with a custom {@link ComponentTree}.
   */
  public static LithoView create(ComponentContext context, ComponentTree componentTree) {
    final LithoView lithoView = new LithoView(context);
    lithoView.setComponentTree(componentTree);
    return lithoView;
  }

  public LithoView(Context context) {
    this(context, null);
  }

  public LithoView(Context context, @Nullable AttributeSet attrs) {
    this(new ComponentContext(context), attrs);
  }

  public LithoView(ComponentContext context) {
    this(context, null);
  }

  public LithoView(ComponentContext context, @Nullable AttributeSet attrs) {
    super(context.getAndroidContext(), attrs);
    mComponentContext = context;

    mAccessibilityManager =
        (AccessibilityManager) context.getAndroidContext().getSystemService(ACCESSIBILITY_SERVICE);

    mViewAttributeFlags = LithoMountData.getViewAttributeFlags(this);
  }

  private static void performLayoutOnChildrenIfNecessary(ComponentHost host) {
    final int childCount = host.getChildCount();
    if (childCount == 0) {
      return;
    }

    // Snapshot the children before traversal as measure/layout could trigger events which cause
    // children to be mounted/unmounted.
    View[] children = new View[childCount];
    for (int i = 0; i < childCount; i++) {
      children[i] = host.getChildAt(i);
    }

    for (int i = 0; i < childCount; i++) {
      final View child = children[i];
      if (child.getParent() != host) {
        // child has been removed
        continue;
      }

      if (child.isLayoutRequested()) {
        // The hosting view doesn't allow children to change sizes dynamically as
        // this would conflict with the component's own layout calculations.
        child.measure(
            MeasureSpec.makeMeasureSpec(child.getWidth(), MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(child.getHeight(), MeasureSpec.EXACTLY));
        child.layout(child.getLeft(), child.getTop(), child.getRight(), child.getBottom());
      }

      if (child instanceof ComponentHost) {
        performLayoutOnChildrenIfNecessary((ComponentHost) child);
      }
    }
  }

  protected void forceRelayout() {
    mForceLayout = true;
    requestLayout();
  }

  public void setTemporaryDetachedComponentTree(@Nullable ComponentTree componentTree) {
    mTemporaryDetachedComponentTree = componentTree;
  }

  public boolean hasTemporaryDetachedComponentTree() {
    return mTemporaryDetachedComponentTree != null;
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    onAttach();
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    onDetach();
  }

  /**
   * Along with {@link #onDetachedFromWindowForTest} below, makes the LithoView think it's attached/
   * detached in a unit test environment. This also handles setting the same state for all LithoView
   * children.
   *
   * <p>Implementation Note: Ideally, we'd just attach the LithoView to a View hierarchy and let
   * AOSP handle all this for us. The reason we haven't is because attaching to an Activity while
   * also trying to make sure the full LithoView is always considered visible (for the purposes of
   * visibility events and incremental mount) proved difficult - if interested, see summary on the
   * blame diff for this comment for more info.
   */
  @VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
  public void onAttachedToWindowForTest() {
    if (mIsAttachedForTest) {
      return;
    }

    onAttachedToWindow();
    mIsAttachedForTest = true;

    dispatchAttachedForTestToChildren();
  }

  @VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
  public void onDetachedFromWindowForTest() {
    if (!mIsAttachedForTest) {
      return;
    }

    mIsAttachedForTest = false;
    onDetachedFromWindow();

    dispatchAttachedForTestToChildren();
  }

  @Override
  public void onStartTemporaryDetach() {
    super.onStartTemporaryDetach();
    onDetach();
  }

  @Override
  public void onFinishTemporaryDetach() {
    super.onFinishTemporaryDetach();
    onAttach();
  }

  private void onAttach() {
    if (!mIsAttached) {
      mIsAttached = true;

      if (mComponentTree != null) {
        mComponentTree.attach();
      }

      refreshAccessibilityDelegatesIfNeeded(isAccessibilityEnabled(getContext()));

      AccessibilityManagerCompat.addAccessibilityStateChangeListener(
          mAccessibilityManager, mAccessibilityStateChangeListener);
    }
  }

  private void onDetach() {
    if (mIsAttached) {
      mIsAttached = false;

      getMountState().detach();

      if (mComponentTree != null) {
        mComponentTree.detach();
      }

      AccessibilityManagerCompat.removeAccessibilityStateChangeListener(
          mAccessibilityManager, mAccessibilityStateChangeListener);

      mSuppressMeasureComponentTree = false;
    }
  }

  /**
   * If set to true, the onMeasure(..) call won't measure the ComponentTree with the given measure
   * specs, but it will just use them as measured dimensions.
   */
  public void suppressMeasureComponentTree(boolean suppress) {
    mSuppressMeasureComponentTree = suppress;
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    final boolean isTracing = ComponentsSystrace.isTracing();
    try {
      if (isTracing) {
        ComponentsSystrace.beginSection("LithoView.onMeasure");
      }
      onMeasureInternal(widthMeasureSpec, heightMeasureSpec);
    } finally {
      if (isTracing) {
        ComponentsSystrace.endSection();
      }
    }
  }

  private void onMeasureInternal(int widthMeasureSpec, int heightMeasureSpec) {
    // mAnimatedWidth/mAnimatedHeight >= 0 if something is driving a width/height animation.
    final boolean animating = mAnimatedWidth != -1 || mAnimatedHeight != -1;
    // up to date view sizes, taking into account running animations
    final int upToDateWidth = (mAnimatedWidth != -1) ? mAnimatedWidth : getWidth();
    final int upToDateHeight = (mAnimatedHeight != -1) ? mAnimatedHeight : getHeight();
    mAnimatedWidth = -1;
    mAnimatedHeight = -1;

    if (animating) {
      // If the mount state is dirty, we want to ignore the current animation and calculate the
      // new LayoutState as normal below. That LayoutState has the opportunity to define its own
      // transition to a new width/height from the current height of the LithoView, or if not we
      // will jump straight to that width/height.
      if (!isMountStateDirty()) {
        setMeasuredDimension(upToDateWidth, upToDateHeight);
        return;
      }
    }

    LayoutParams layoutParams = getLayoutParams();
    if (layoutParams instanceof LayoutManagerOverrideParams) {
      LayoutManagerOverrideParams layoutManagerOverrideParams =
          (LayoutManagerOverrideParams) layoutParams;
      final int overrideWidthSpec = layoutManagerOverrideParams.getWidthMeasureSpec();
      if (overrideWidthSpec != LayoutManagerOverrideParams.UNINITIALIZED) {
        widthMeasureSpec = overrideWidthSpec;
      }
      final int overrideHeightSpec = layoutManagerOverrideParams.getHeightMeasureSpec();
      if (overrideHeightSpec != LayoutManagerOverrideParams.UNINITIALIZED) {
        heightMeasureSpec = overrideHeightSpec;
      }
    }

    int width = MeasureSpec.getSize(widthMeasureSpec);
    int height = MeasureSpec.getSize(heightMeasureSpec);

    if (mTemporaryDetachedComponentTree != null && mComponentTree == null) {
      setComponentTree(mTemporaryDetachedComponentTree);
      mTemporaryDetachedComponentTree = null;
    }

    if (!mForceLayout
        && SizeSpec.getMode(widthMeasureSpec) == SizeSpec.EXACTLY
        && SizeSpec.getMode(heightMeasureSpec) == SizeSpec.EXACTLY) {
      // If the measurements are exact, postpone LayoutState calculation from measure to layout.
      // This is part of the fix for android's double measure bug. Doing this means that if we get
      // remeasured with different exact measurements, we don't compute two layouts.
      mDoMeasureInLayout = true;
      setMeasuredDimension(width, height);
      return;
    }

    mIsMeasuring = true;

    if (mComponentTree != null && !mSuppressMeasureComponentTree) {
      boolean forceRelayout = mForceLayout;
      mForceLayout = false;
      mComponentTree.measure(
          adjustMeasureSpecForPadding(widthMeasureSpec, getPaddingRight() + getPaddingLeft()),
          adjustMeasureSpecForPadding(heightMeasureSpec, getPaddingTop() + getPaddingBottom()),
          sLayoutSize,
          forceRelayout);

      width = sLayoutSize[0];
      height = sLayoutSize[1];
      mDoMeasureInLayout = false;
    }

    if (height == 0) {
      maybeLogInvalidZeroHeight();
    }
    final boolean hasMounted = mMountInfo != null && mMountInfo.mHasMounted;

    final boolean canAnimateRootBounds =
        !mSuppressMeasureComponentTree
            && mComponentTree != null
            && (!mHasNewComponentTree || !hasMounted);

    if (canAnimateRootBounds) {
      // We might need to collect transitions before mount to know whether this LithoView has
      // width or height animation.
      maybeCollectAllTransitions();

      final int initialAnimatedWidth =
          getInitialAnimatedLithoViewWidth(upToDateWidth, mHasNewComponentTree);
      if (initialAnimatedWidth != -1) {
        width = initialAnimatedWidth;
      }

      final int initialAnimatedHeight =
          getInitialAnimatedLithoViewHeight(upToDateHeight, mHasNewComponentTree);
      if (initialAnimatedHeight != -1) {
        height = initialAnimatedHeight;
      }
    }
    setMeasuredDimension(width, height);

    mHasNewComponentTree = false;
    mIsMeasuring = false;
  }

  @Override
  protected void performLayout(boolean changed, int left, int top, int right, int bottom) {
    final boolean isTracing = ComponentsSystrace.isTracing();
    try {
      if (isTracing) {
        ComponentsSystrace.beginSection("LithoView.performLayout");
      }
      performLayoutInternal(changed, left, top, right, bottom);
    } finally {
      if (isTracing) {
        ComponentsSystrace.endSection();
      }
    }
  }

  private void performLayoutInternal(boolean changed, int left, int top, int right, int bottom) {
    if (mComponentTree != null) {
      if (mComponentTree.isReleased()) {
        throw new IllegalStateException(
            "Trying to layout a LithoView holding onto a released ComponentTree");
      }

      if (mDoMeasureInLayout || mComponentTree.getMainThreadLayoutState() == null) {
        final int widthWithoutPadding =
            Math.max(0, right - left - getPaddingRight() - getPaddingLeft());
        final int heightWithoutPadding =
            Math.max(0, bottom - top - getPaddingTop() - getPaddingBottom());

        // Call measure so that we get a layout state that we can use for layout.
        mComponentTree.measure(
            MeasureSpec.makeMeasureSpec(widthWithoutPadding, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(heightWithoutPadding, MeasureSpec.EXACTLY),
            sLayoutSize,
            false);
        mHasNewComponentTree = false;
        mDoMeasureInLayout = false;
      }

      boolean wasMountTriggered = mountComponentIfNeeded();

      // If this happens the LithoView might have moved on Screen without a scroll event
      // triggering incremental mount. We trigger one here to be sure all the content is visible.
      if (!wasMountTriggered) {
        notifyVisibleBoundsChanged();
      }

      if (!wasMountTriggered || shouldAlwaysLayoutChildren()) {
        // If the layout() call on the component didn't trigger a mount step,
        // we might need to perform an inner layout traversal on children that
        // requested it as certain complex child views (e.g. ViewPager,
        // RecyclerView, etc) rely on that.
        performLayoutOnChildrenIfNecessary(this);
      }
    }
  }

  private static int adjustMeasureSpecForPadding(int measureSpec, int padding) {
    final int mode = MeasureSpec.getMode(measureSpec);
    if (mode == MeasureSpec.UNSPECIFIED) {
      return measureSpec;
    }
    final int size = Math.max(0, MeasureSpec.getSize(measureSpec) - padding);
    return MeasureSpec.makeMeasureSpec(size, mode);
  }

  /**
   * Indicates if the children of this view should be laid regardless to a mount step being
   * triggered on layout. This step can be important when some of the children in the hierarchy are
   * changed (e.g. resized) but the parent wasn't.
   *
   * <p>Since the framework doesn't expect its children to resize after being mounted, this should
   * be used only for extreme cases where the underline views are complex and need this behavior.
   *
   * @return boolean Returns true if the children of this view should be laid out even when a mount
   *     step was not needed.
   */
  protected boolean shouldAlwaysLayoutChildren() {
    return false;
  }

  /**
   * @return {@link ComponentContext} associated with this LithoView. It's a wrapper on the {@link
   *     Context} originally used to create this LithoView itself.
   */
  public ComponentContext getComponentContext() {
    return mComponentContext;
  }

  void assertNotInMeasure() {
    if (mIsMeasuring) {
      // If the ComponentTree is updated during measure, the following .layout() call will not run
      // on the ComponentTree that was prepared in measure.
      throw new RuntimeException("Cannot update ComponentTree while in the middle of measure");
    }
  }

  public @Nullable ComponentTree getComponentTree() {
    return mComponentTree;
  }

  @Nullable
  LayoutState getMountedLayoutState() {
    final @Nullable ComponentTree tree = mComponentTree;
    return tree != null ? tree.getMainThreadLayoutState() : null;
  }

  @VisibleForTesting
  public @Nullable Component getRootComponent() {
    final @Nullable ComponentTree componentTree = mComponentTree;
    return componentTree != null ? componentTree.getRoot() : null;
  }

  public synchronized void setOnDirtyMountListener(OnDirtyMountListener onDirtyMountListener) {
    mOnDirtyMountListener = onDirtyMountListener;
  }

  public void setOnPostDrawListener(@Nullable OnPostDrawListener onPostDrawListener) {
    mOnPostDrawListener = onPostDrawListener;
  }

  @Override
  protected synchronized void onDirtyMountComplete() {
    if (mOnDirtyMountListener != null) {
      mOnDirtyMountListener.onDirtyMount(this);
    }
  }

  public void setComponentTree(@Nullable ComponentTree componentTree) {
    setComponentTree(componentTree, true);
  }

  public void setComponentTree(
      @Nullable ComponentTree componentTree, boolean unmountAllWhenComponentTreeSetToNull) {
    assertMainThread();
    assertNotInMeasure();

    mTemporaryDetachedComponentTree = null;
    if (mComponentTree == componentTree) {
      if (mIsAttached) {
        rebind();
      }
      return;
    }

    mHasNewComponentTree =
        mComponentTree == null || componentTree == null || mComponentTree.mId != componentTree.mId;
    setMountStateDirty();

    if (mComponentTree != null) {
      if (componentTree == null && unmountAllWhenComponentTreeSetToNull) {
        unmountAllItems();
      } else if (componentTree != null) {
        clearVisibilityItems();
        clearLastMountedTree();
      }

      if (mInvalidStateLogParams != null) {
        mPreviousComponentSimpleName = mComponentTree.getSimpleName();
      }
      if (componentTree != null
          && componentTree.getLithoView() != null
          && mInvalidStateLogParams != null
          && mInvalidStateLogParams.containsKey(SET_ALREADY_ATTACHED_COMPONENT_TREE)) {
        logSetAlreadyAttachedComponentTree(
            mComponentTree,
            componentTree,
            mInvalidStateLogParams.get(SET_ALREADY_ATTACHED_COMPONENT_TREE));
      }
      if (mIsAttached) {
        mComponentTree.detach();
      }

      mComponentTree.clearLithoView();
    }

    mComponentTree = componentTree;
    if (componentTree != null && componentTree.getTreeState() != null) {
      mMountInfo = componentTree.getTreeState().getMountInfo();
    } else {
      mMountInfo = null;
    }

    setupMountExtensions();

    if (mComponentTree != null) {
      if (mComponentTree.isReleased()) {
        throw new IllegalStateException(
            "Setting a released ComponentTree to a LithoView, "
                + "released component was: "
                + mComponentTree.getReleasedComponent());
      }
      mComponentTree.setLithoView(this);

      if (mIsAttached) {
        mComponentTree.attach();
      } else {
        requestLayout();
      }
    }
    mNullComponentCause = mComponentTree == null ? "set_CT" : null;
  }

  /** Change the root component synchronously. */
  public void setComponent(Component component) {
    if (mComponentTree == null) {
      setComponentTree(ComponentTree.create(getComponentContext(), component).build());
    } else {
      mComponentTree.setRoot(component);
    }
  }

  /**
   * Change the root component measuring it on a background thread before updating the UI. If this
   * {@link LithoView} doesn't have a ComponentTree initialized, the root will be computed
   * synchronously.
   */
  public void setComponentAsync(Component component) {
    if (mComponentTree == null) {
      setComponentTree(ComponentTree.create(getComponentContext(), component).build());
    } else {
      mComponentTree.setRootAsync(component);
    }
  }

  public void rebind() {
    getMountState().attach();
  }

  /**
   * To be called this when the LithoView is about to become inactive. This means that either the
   * view is about to be recycled or moved off-screen.
   */
  public void unbind() {
    getMountState().detach();
  }

  /**
   * @return true if this LithoView has a ComponentTree attached and a LithoLifecycleProvider is set
   *     on it, false otherwise.
   */
  public synchronized boolean componentTreeHasLifecycleProvider() {
    return mComponentTree != null && mComponentTree.isSubscribedToLifecycleProvider();
  }

  /**
   * If this LithoView has a ComponentTree attached to it, set a LithoLifecycleProvider if it
   * doesn't already have one.
   *
   * @return true if the LithoView's ComponentTree was subscribed as listener to the given
   *     LithoLifecycleProvider, false otherwise.
   */
  public synchronized boolean subscribeComponentTreeToLifecycleProvider(
      LithoLifecycleProvider lifecycleProvider) {
    if (mComponentTree == null) {
      return false;
    }

    if (mComponentTree.isSubscribedToLifecycleProvider()) {
      return false;
    }

    mComponentTree.subscribeToLifecycleProvider(lifecycleProvider);
    return true;
  }

  @Override
  public void setVisibilityHint(boolean isVisible, boolean skipMountingIfNotVisible) {
    if (componentTreeHasLifecycleProvider()) {
      ComponentsReporter.emitMessage(
          ComponentsReporter.LogLevel.WARNING,
          LITHO_LIFECYCLE_FOUND,
          "Setting visibility hint but a LithoLifecycleProvider was found, ignoring.");

      return;
    }
    super.setVisibilityHint(isVisible, skipMountingIfNotVisible);
  }

  @Override
  public void setVisibilityHint(boolean isVisible) {
    if (componentTreeHasLifecycleProvider()) {
      ComponentsReporter.emitMessage(
          ComponentsReporter.LogLevel.WARNING,
          LITHO_LIFECYCLE_FOUND,
          "Setting visibility hint but a LithoLifecycleProvider was found, ignoring.");

      return;
    }
    super.setVisibilityHint(isVisible);
  }

  @Override
  Object onBeforeMount() {
    super.onBeforeMount();
    final boolean loggedFirstMount =
        LithoView.MountStartupLoggingInfo.maybeLogFirstMountStart(mMountStartupLoggingInfo);
    final boolean loggedLastMount =
        LithoView.MountStartupLoggingInfo.maybeLogLastMountStart(mMountStartupLoggingInfo, this);
    return new boolean[] {loggedFirstMount, loggedLastMount};
  }

  @Override
  void onAfterMount(@Nullable Object fromOnBeforeMount) {
    super.onAfterMount(fromOnBeforeMount);
    if (fromOnBeforeMount == null) {
      throw new IllegalStateException(
          "Should have received wether firs and last mount should be logged");
    }
    final boolean[] fromBefore = (boolean[]) fromOnBeforeMount;
    if (mIsAttachedForTest) {
      dispatchAttachedForTestToChildren();
    }

    if (fromBefore[0]) {
      LithoView.MountStartupLoggingInfo.logFirstMountEnd(mMountStartupLoggingInfo);
    }
    if (fromBefore[1]) {
      LithoView.MountStartupLoggingInfo.logLastMountEnd(mMountStartupLoggingInfo);
    }
  }

  @Override
  public void draw(Canvas canvas) {
    final boolean isTracing = ComponentsSystrace.isTracing();
    try {
      if (isTracing) {
        ComponentsSystrace.beginSection("LithoView.draw");
      }
      drawInternal(canvas);
    } finally {
      if (isTracing) {
        ComponentsSystrace.endSection();
      }
    }
  }

  private void drawInternal(Canvas canvas) {
    try {
      canvas.translate(getPaddingLeft(), getPaddingTop());
      super.draw(canvas);
    } catch (Throwable t) {
      throw new LithoMetadataExceptionWrapper(mComponentTree, t);
    }

    if (mOnPostDrawListener != null) {
      mOnPostDrawListener.onPostDraw();
    }
  }

  @Nullable
  @Override
  LayoutState getCurrentLayoutState() {
    return mComponentTree == null ? null : mComponentTree.getMainThreadLayoutState();
  }

  @Nullable
  @Override
  protected TreeState getTreeState() {
    return mComponentTree == null ? null : mComponentTree.getTreeState();
  }

  @Override
  protected boolean hasTree() {
    return mComponentTree != null;
  }

  @Override
  protected String getTreeName() {
    return mComponentTree != null ? mComponentTree.getSimpleName() : null;
  }

  @Override
  public boolean isIncrementalMountEnabled() {
    return (mComponentTree != null && mComponentTree.isIncrementalMountEnabled());
  }

  @Override
  protected boolean isVisibilityProcessingEnabled() {
    return (mComponentTree != null && mComponentTree.isVisibilityProcessingEnabled());
  }

  /** Deprecated: Consider subscribing the LithoView to a LithoLifecycleOwner instead. */
  @Deprecated
  public void release() {
    assertMainThread();
    if (componentTreeHasLifecycleProvider()) {
      ComponentsReporter.emitMessage(
          ComponentsReporter.LogLevel.WARNING,
          LITHO_LIFECYCLE_FOUND,
          "Trying to release a LithoView but a LithoLifecycleProvider was found, ignoring.");

      return;
    }

    final List<BaseMountingView> childrenLithoViews =
        getChildMountingViewsFromCurrentlyMountedItems();
    if (childrenLithoViews != null) {
      for (BaseMountingView child : childrenLithoViews) {
        if (child instanceof LithoView) {
          ((LithoView) child).release();
        }
      }
    }

    if (mComponentTree != null) {
      mComponentTree.release();
      ComponentTree.clearDebugOverlay(this);
      mMountInfo = null;
      mNullComponentCause = "release_CT";
    }
  }

  @Nullable
  @VisibleForTesting
  public DynamicPropsManager getDynamicPropsManager() {
    final LithoHostListenerCoordinator lithoHostListenerCoordinator =
        getLithoHostListenerCoordinator();
    if (lithoHostListenerCoordinator != null) {
      return lithoHostListenerCoordinator.getDynamicPropsManager();
    } else {
      return null;
    }
  }

  VisibilityMountExtension.VisibilityMountExtensionState getVisibilityExtensionState() {
    return (VisibilityMountExtension.VisibilityMountExtensionState)
        getLithoHostListenerCoordinator().getVisibilityExtensionState().getState();
  }

  public void setMountStartupLoggingInfo(
      LithoStartupLogger startupLogger,
      String startupLoggerAttribution,
      boolean[] firstMountCalled,
      boolean[] lastMountCalled,
      boolean isLastAdapterItem,
      boolean isOrientationVertical) {

    mMountStartupLoggingInfo =
        new MountStartupLoggingInfo(
            startupLogger,
            startupLoggerAttribution,
            firstMountCalled,
            lastMountCalled,
            isLastAdapterItem,
            isOrientationVertical);
  }

  public void resetMountStartupLoggingInfo() {
    mMountStartupLoggingInfo = null;
  }

  /** Register for particular invalid state logs. */
  public void setInvalidStateLogParamsList(@Nullable List<ComponentLogParams> logParamsList) {
    if (logParamsList == null) {
      mInvalidStateLogParams = null;
    } else {
      mInvalidStateLogParams = new HashMap<>();
      for (int i = 0, size = logParamsList.size(); i < size; i++) {
        final ComponentLogParams logParams = logParamsList.get(i);
        mInvalidStateLogParams.put(logParams.logType, logParams);
      }
    }
  }

  private void maybeLogInvalidZeroHeight() {
    if (mComponentTree != null
        && mComponentTree.getMainThreadLayoutState() != null
        && mComponentTree.getMainThreadLayoutState().mRoot == null) {
      // Valid case for 0-height, onCreateLayout of root component returned null.
      return;
    }

    final ComponentLogParams logParams =
        mInvalidStateLogParams == null ? null : mInvalidStateLogParams.get(ZERO_HEIGHT_LOG);
    if (logParams == null) {
      // surface didn't subscribe for this type of logging.
      return;
    }

    final LayoutParams layoutParams = getLayoutParams();
    final boolean isViewBeingRemovedInPreLayoutOfPredictiveAnim =
        layoutParams instanceof LayoutManagerOverrideParams
            && ((LayoutManagerOverrideParams) layoutParams).hasValidAdapterPosition();

    if (isViewBeingRemovedInPreLayoutOfPredictiveAnim) {
      return;
    }

    final StringBuilder messageBuilder = new StringBuilder();
    messageBuilder.append(logParams.logProductId);
    messageBuilder.append("-");
    messageBuilder.append(ZERO_HEIGHT_LOG);
    messageBuilder.append(", current=");
    messageBuilder.append(
        (mComponentTree == null ? "null_" + mNullComponentCause : mComponentTree.getSimpleName()));
    messageBuilder.append(", previous=");
    messageBuilder.append(mPreviousComponentSimpleName);
    messageBuilder.append(", view=");
    messageBuilder.append(LithoViewTestHelper.toDebugString(this));
    logError(messageBuilder.toString(), ZERO_HEIGHT_LOG, logParams);
  }

  private void logSetAlreadyAttachedComponentTree(
      ComponentTree currentComponentTree,
      ComponentTree newComponentTree,
      ComponentLogParams logParams) {
    final StringBuilder messageBuilder = new StringBuilder();
    messageBuilder.append(logParams.logProductId);
    messageBuilder.append("-");
    messageBuilder.append(SET_ALREADY_ATTACHED_COMPONENT_TREE);
    messageBuilder.append(", currentView=");
    messageBuilder.append(LithoViewTestHelper.toDebugString(currentComponentTree.getLithoView()));
    messageBuilder.append(", newComponent.LV=");
    messageBuilder.append(LithoViewTestHelper.toDebugString(newComponentTree.getLithoView()));
    messageBuilder.append(", currentComponent=");
    messageBuilder.append(currentComponentTree.getSimpleName());
    messageBuilder.append(", newComponent=");
    messageBuilder.append(newComponentTree.getSimpleName());
    logError(messageBuilder.toString(), SET_ALREADY_ATTACHED_COMPONENT_TREE, logParams);
  }

  private static void logError(String message, String categoryKey, ComponentLogParams logParams) {
    final ComponentsReporter.LogLevel logLevel =
        logParams.failHarder
            ? ComponentsReporter.LogLevel.FATAL
            : ComponentsReporter.LogLevel.ERROR;
    ComponentsReporter.emitMessage(logLevel, categoryKey, message, logParams.samplingFrequency);
  }

  @DoNotStrip
  @VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
  Deque<TestItem> findTestItems(String testKey) {
    final LithoHostListenerCoordinator lithoHostListenerCoordinator =
        getLithoHostListenerCoordinator();
    if (lithoHostListenerCoordinator == null) {
      return new LinkedList<>();
    }

    if (lithoHostListenerCoordinator.getEndToEndTestingExtension() == null) {
      throw new IllegalStateException(
          "Trying to access TestItems while "
              + "ComponentsConfiguration.isEndToEndTestRun is false.");
    }

    return lithoHostListenerCoordinator.getEndToEndTestingExtension().findTestItems(testKey);
  }

  private void dispatchAttachedForTestToChildren() {
    recursivelyDispatchedAttachedForTest(this, mIsAttachedForTest);
  }

  private static void recursivelyDispatchedAttachedForTest(
      ViewGroup viewGroup, boolean isAttachedForTest) {
    for (int i = 0; i < viewGroup.getChildCount(); i++) {
      View child = viewGroup.getChildAt(i);
      if (child instanceof LithoView) {
        if (isAttachedForTest) {
          ((LithoView) child).onAttachedToWindowForTest();
        } else {
          ((LithoView) child).onDetachedFromWindowForTest();
        }
      } else if (child instanceof ViewGroup) {
        recursivelyDispatchedAttachedForTest((ViewGroup) child, isAttachedForTest);
      }
    }
  }

  private static class AccessibilityStateChangeListener
      extends AccessibilityStateChangeListenerCompat {
    private final WeakReference<LithoView> mLithoView;

    private AccessibilityStateChangeListener(LithoView lithoView) {
      mLithoView = new WeakReference<>(lithoView);
    }

    @Override
    public void onAccessibilityStateChanged(boolean enabled) {
      AccessibilityUtils.invalidateCachedIsAccessibilityEnabled();
      final LithoView lithoView = mLithoView.get();
      if (lithoView == null) {
        return;
      }

      lithoView.rerenderForAccessibility(enabled);
    }
  }

  public void rerenderForAccessibility(boolean enabled) {
    refreshAccessibilityDelegatesIfNeeded(enabled);
    // must force (not just request)
    forceRelayout();
  }

  /**
   * LayoutParams that override the LayoutManager.
   *
   * <p>If you set LayoutParams on a LithoView that implements this interface, the view will
   * completely ignore the layout specs given to it by its LayoutManager and use these specs
   * instead. To use, set the LayoutParams height and width to {@link
   * ViewGroup.LayoutParams#WRAP_CONTENT} and then provide a width and height measure spec though
   * this interface.
   *
   * <p>This is helpful for implementing {@link View.MeasureSpec#AT_MOST} support since Android
   * LayoutManagers don't support an AT_MOST concept as part of {@link ViewGroup.LayoutParams}'s
   * special values.
   */
  public interface LayoutManagerOverrideParams {

    int UNINITIALIZED = -1;

    int getWidthMeasureSpec();

    int getHeightMeasureSpec();

    // TODO T30527513 Remove after fixing 0 height issues.
    boolean hasValidAdapterPosition();
  }

  @Override
  public String toString() {
    // dump this view and include litho internal UI data
    return super.toString() + LithoViewTestHelper.viewToString(this, true);
  }

  static class MountStartupLoggingInfo {
    private final LithoStartupLogger startupLogger;
    private final String startupLoggerAttribution;
    private final boolean[] firstMountLogged;
    private final boolean[] lastMountLogged;
    private final boolean isLastAdapterItem;
    private final boolean isOrientationVertical;

    MountStartupLoggingInfo(
        LithoStartupLogger startupLogger,
        String startupLoggerAttribution,
        boolean[] firstMountLogged,
        boolean[] lastMountLogged,
        boolean isLastAdapterItem,
        boolean isOrientationVertical) {
      this.startupLogger = startupLogger;
      this.startupLoggerAttribution = startupLoggerAttribution;
      this.firstMountLogged = firstMountLogged;
      this.lastMountLogged = lastMountLogged;
      this.isLastAdapterItem = isLastAdapterItem;
      this.isOrientationVertical = isOrientationVertical;
    }

    static boolean maybeLogFirstMountStart(@Nullable MountStartupLoggingInfo loggingInfo) {
      if (loggingInfo != null
          && LithoStartupLogger.isEnabled(loggingInfo.startupLogger)
          && loggingInfo.firstMountLogged != null
          && !loggingInfo.firstMountLogged[0]) {
        loggingInfo.startupLogger.markPoint(
            LithoStartupLogger.FIRST_MOUNT,
            LithoStartupLogger.START,
            loggingInfo.startupLoggerAttribution);
        return true;
      }
      return false;
    }

    static boolean maybeLogLastMountStart(
        @Nullable MountStartupLoggingInfo loggingInfo, LithoView lithoView) {
      if (loggingInfo != null
          && LithoStartupLogger.isEnabled(loggingInfo.startupLogger)
          && loggingInfo.firstMountLogged != null
          && loggingInfo.firstMountLogged[0]
          && loggingInfo.lastMountLogged != null
          && !loggingInfo.lastMountLogged[0]) {

        final ViewGroup parent = (ViewGroup) lithoView.getParent();
        if (parent == null) {
          return false;
        }

        if (loggingInfo.isLastAdapterItem
            || (loggingInfo.isOrientationVertical
                ? lithoView.getBottom() >= parent.getHeight() - parent.getPaddingBottom()
                : lithoView.getRight() >= parent.getWidth() - parent.getPaddingRight())) {
          loggingInfo.startupLogger.markPoint(
              LithoStartupLogger.LAST_MOUNT,
              LithoStartupLogger.START,
              loggingInfo.startupLoggerAttribution);
          return true;
        }
      }
      return false;
    }

    static void logFirstMountEnd(MountStartupLoggingInfo loggingInfo) {
      loggingInfo.startupLogger.markPoint(
          LithoStartupLogger.FIRST_MOUNT,
          LithoStartupLogger.END,
          loggingInfo.startupLoggerAttribution);
      loggingInfo.firstMountLogged[0] = true;
    }

    static void logLastMountEnd(MountStartupLoggingInfo loggingInfo) {
      loggingInfo.startupLogger.markPoint(
          LithoStartupLogger.LAST_MOUNT,
          LithoStartupLogger.END,
          loggingInfo.startupLoggerAttribution);
      loggingInfo.lastMountLogged[0] = true;
    }
  }

  @Override
  protected Map<String, Object> getLayoutErrorMetadata(int width, int height) {
    final Map<String, Object> metadata = super.getLayoutErrorMetadata(width, height);

    final @Nullable ComponentTree tree = getComponentTree();
    if (tree == null) {
      metadata.put("lithoView", null);
      return metadata;
    }

    final Map<String, Object> lithoSpecific = new HashMap<>();
    metadata.put("lithoView", lithoSpecific);
    if (tree.getRoot() == null) {
      lithoSpecific.put("root", null);
      return metadata;
    }

    lithoSpecific.put("root", tree.getRoot().getSimpleName());
    lithoSpecific.put("tree", ComponentTreeDumpingHelper.dumpContextTree(tree));

    return metadata;
  }

  /**
   * @return the width value that LithoView should be animating from. If this returns non-negative
   *     value, we will override the measured width with this value so that initial animated value
   *     is correctly applied.
   */
  @ThreadConfined(ThreadConfined.UI)
  int getInitialAnimatedLithoViewWidth(int currentAnimatedWidth, boolean hasNewComponentTree) {
    final Transition.RootBoundsTransition transition =
        mComponentTree != null && mComponentTree.getMainThreadLayoutState() != null
            ? mComponentTree.getMainThreadLayoutState().getRootWidthAnimation()
            : null;
    return getInitialAnimatedLithoViewDimension(
        currentAnimatedWidth, hasNewComponentTree, transition, AnimatedProperties.WIDTH);
  }

  /**
   * @return the height value that LithoView should be animating from. If this returns non-negative
   *     value, we will override the measured height with this value so that initial animated value
   *     is correctly applied.
   */
  @ThreadConfined(ThreadConfined.UI)
  int getInitialAnimatedLithoViewHeight(int currentAnimatedHeight, boolean hasNewComponentTree) {
    final Transition.RootBoundsTransition transition =
        mComponentTree != null && mComponentTree.getMainThreadLayoutState() != null
            ? mComponentTree.getMainThreadLayoutState().getRootHeightAnimation()
            : null;
    return getInitialAnimatedLithoViewDimension(
        currentAnimatedHeight, hasNewComponentTree, transition, AnimatedProperties.HEIGHT);
  }

  private int getInitialAnimatedLithoViewDimension(
      int currentAnimatedDimension,
      boolean hasNewComponentTree,
      @Nullable Transition.RootBoundsTransition rootBoundsTransition,
      AnimatedProperty property) {
    if (rootBoundsTransition == null) {
      return -1;
    }
    final boolean hasMounted = mMountInfo != null && mMountInfo.mHasMounted;
    if (!hasMounted && rootBoundsTransition.appearTransition != null) {
      return (int)
          Transition.getRootAppearFromValue(
              rootBoundsTransition.appearTransition,
              mComponentTree.getMainThreadLayoutState(),
              property);
    }

    if (hasMounted && !hasNewComponentTree) {
      return currentAnimatedDimension;
    }

    return -1;
  }

  public interface OnDirtyMountListener {
    /**
     * Called when finishing a mount where the mount state was dirty. This indicates that there were
     * new props/state in the tree, or the LithoView was mounting a new ComponentTree
     */
    void onDirtyMount(LithoView view);
  }

  public interface OnPostDrawListener {
    void onPostDraw();
  }
}
