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

package com.facebook.rendercore

import com.facebook.kotlin.compilerplugins.dataclassgenerate.annotation.DataClassGenerate
import com.facebook.kotlin.compilerplugins.dataclassgenerate.annotation.Mode
import com.facebook.rendercore.StateUpdateReceiver.StateUpdate

/** Represents the result of resolving a Rendercore [Node] */
@DataClassGenerate(toString = Mode.OMIT, equalsHashCode = Mode.KEEP)
data class ResolveResult<T : Node<*>?, State>
@JvmOverloads
constructor(
    @JvmField val resolvedNode: T,
    @JvmField val resolvedState: State? = null,
    @JvmField val appliedStateUpdates: List<StateUpdate<*>>? = null
)