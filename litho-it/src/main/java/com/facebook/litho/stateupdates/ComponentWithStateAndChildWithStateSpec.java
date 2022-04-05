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

package com.facebook.litho.stateupdates;

import com.facebook.litho.Column;
import com.facebook.litho.Component;
import com.facebook.litho.ComponentContext;
import com.facebook.litho.StateValue;
import com.facebook.litho.annotations.LayoutSpec;
import com.facebook.litho.annotations.OnCreateInitialState;
import com.facebook.litho.annotations.OnCreateLayout;
import com.facebook.litho.annotations.OnUpdateState;
import com.facebook.litho.annotations.State;
import com.facebook.litho.widget.Text;

@LayoutSpec
public class ComponentWithStateAndChildWithStateSpec {
  @OnCreateInitialState
  static void OnCreateInitialState(ComponentContext c, StateValue<Integer> count) {
    count.set(0);
  }

  @OnCreateLayout
  public static Component onCreateLayout(ComponentContext c, @State Integer count) {
    return Column.create(c)
        .child(ComponentWithCounterStateLayout.create(c))
        .child(ComponentWithCounterStateLayout.create(c))
        .child(Text.create(c).text("Count: " + count))
        .build();
  }

  @OnUpdateState
  static void incrementCount(StateValue<Integer> count) {
    count.set(count.get() + 1);
  }
}
