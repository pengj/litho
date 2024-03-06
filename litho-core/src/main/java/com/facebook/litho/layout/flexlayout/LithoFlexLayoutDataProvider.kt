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

package com.facebook.litho.layout.flexlayout

import com.facebook.flexlayout.styles.FlexBoxStyle
import com.facebook.flexlayout.styles.FlexItemStyle
import com.facebook.litho.Border
import com.facebook.litho.Component
import com.facebook.litho.Edges
import com.facebook.litho.LithoLayoutContext
import com.facebook.litho.LithoNode
import com.facebook.litho.LithoNode.Companion.copyStyledAttributes
import com.facebook.litho.LithoYogaLayoutFunction
import com.facebook.litho.layout.LayoutDirection
import com.facebook.rendercore.Node
import com.facebook.yoga.YogaConstants
import com.facebook.yoga.YogaEdge

class LithoFlexLayoutDataProvider {

  /** Read the properties from the LithoNode and convert them to FlexBoxStyle. */
  fun flexBoxStyleBuilderFromNode(
      node: Node<LithoLayoutContext>,
      isLTR: Boolean
  ): FlexBoxStyle.Builder {
    node as LithoNode
    val builder = FlexBoxStyle.Builder()
    val writer = FlexContainerLayoutPropsWriter(builder, isLTR)
    if (!isLTR) {
      writer.layoutDirection(LayoutDirection.RTL)
    }
    node.flexDirection?.let { writer.flexDirection(it) }
    node.justifyContent?.let { writer.justifyContent(it) }
    node.alignContent?.let { writer.alignContent(it) }
    node.alignItems?.let { writer.alignItems(it) }
    node.yogaWrap?.let { writer.flexWrap(it) }

    for (info in node.scopedComponentInfos) {
      val component: Component = info.component
      // If a NestedTreeHolder is set then transfer its resolved props into this LithoNode.
      if (node.nestedTreeHolder != null && Component.isLayoutSpecWithSizeSpec(component)) {
        node.nestedTreeHolder?.transferInto(node)
        node._needsHostView = LithoNode.needsHostView(node)
        node.paddingFromBackground?.let {
          LithoYogaLayoutFunction.setPaddingFromDrawable(writer, it)
        }
      } else {
        info.commonProps?.let { props ->
          // Copy styled attributes into this FlexBoxStyle.
          props.copyStyledAttributes(node.tailComponentContext.androidContext, writer)

          // Set the padding from the background
          props.paddingFromBackground?.let {
            LithoYogaLayoutFunction.setPaddingFromDrawable(writer, it)
          }

          // Copy the layout props into FlexBoxStyle.
          props.copyLayoutProps(writer)
        }
      }
    }

    // Apply the border widths
    if (node.privateFlags and LithoNode.PFLAG_BORDER_IS_SET != 0L) {
      for (i in node.borderEdgeWidths.indices) {
        writer.setBorderWidth(Border.edgeFromIndex(i), node.borderEdgeWidths[i].toFloat())
      }
    }

    // Maybe apply the padding if parent is a Nested Tree Holder
    node.nestedPaddingEdges?.let { edges ->
      for (i in 0 until Edges.EDGES_LENGTH) {
        val value: Float = edges.getRaw(i)
        if (!YogaConstants.isUndefined(value)) {
          val yogaEdge: YogaEdge = YogaEdge.fromInt(i)
          if (node.nestedIsPaddingPercent?.get(yogaEdge.intValue()) != null) {
            writer.paddingPercent(yogaEdge, value)
          } else {
            writer.paddingPx(yogaEdge, value.toInt())
          }
        }
      }
    }
    return builder
  }

  /** Read the properties from the LithoNode and convert them to FlexItemStyle. */
  fun flexItemStyleBuilderFromNode(
      node: Node<LithoLayoutContext>,
      isLTR: Boolean
  ): FlexItemStyle.Builder {
    node as LithoNode
    val builder = FlexItemStyle.Builder()
    val writer =
        FlexItemLayoutPropsWriter(
            builder = builder, isContainer = node.childCount > 0, isLTR = isLTR)
    for (info in node.scopedComponentInfos) {
      info.commonProps?.let { props ->
        // Copy styled attributes into this FlexItemStyle.
        props.copyStyledAttributes(node.tailComponentContext.androidContext, writer)

        // Copy the layout props into this FlexItemStyle.
        props.copyLayoutProps(writer)
      }
    }
    return builder
  }
}