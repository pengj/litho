// (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.

package com.facebook.rendercore.debug

import com.facebook.rendercore.LogLevel
import com.facebook.rendercore.debug.DebugEvent.Companion.All
import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class DebugEventsTest {

  companion object {
    const val TestEvent = "TestEvent"
    const val TestRenderStateId = "1"
    const val TestAttr = "attr"
    const val TestAttrValue = 1
  }

  @Before
  fun before() {
    DebugEventDispatcher.enabled = true
    DebugEventDispatcher.minLogLevel = LogLevel.DEBUG
  }

  @After
  fun after() {
    DebugEventBus.unsubscribeAll()
    DebugEventDispatcher.enabled = false
  }

  @Test
  fun `test event should be dispatched to subscriber`() {
    var event: DebugEvent? = null
    DebugEventBus.subscribe { TestEventSubscriber { e -> event = e } }

    val timestamp = System.currentTimeMillis()
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = timestamp,
    ) { map ->
      map[TestAttr] = TestAttrValue
    }

    assertThat(event).isNotNull
    assertThat(event?.type).isEqualTo(TestEvent)
    assertThat(event?.renderStateId).isEqualTo(TestRenderStateId)
    assertThat(event?.attribute<Long>(DebugEventAttribute.timestamp)).isEqualTo(timestamp)
    assertThat(event?.attribute<Int>(TestAttr)).isEqualTo(TestAttrValue)
  }

  @Test
  fun `test event should be dispatched to multiple subscribers`() {
    var eventToSub1: DebugEvent? = null
    var eventToSub2: DebugEvent? = null
    DebugEventBus.subscribe { TestEventSubscriber { e -> eventToSub1 = e } }
    DebugEventBus.subscribe { TestEventSubscriber { e -> eventToSub2 = e } }

    val timestamp = System.currentTimeMillis()
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = timestamp,
    ) { map ->
      map[TestAttr] = TestAttrValue
    }

    assertThat(eventToSub1).isNotNull
    assertThat(eventToSub1?.type).isEqualTo(TestEvent)
    assertThat(eventToSub1?.renderStateId).isEqualTo(TestRenderStateId)
    assertThat(eventToSub1?.attribute<Long>(DebugEventAttribute.timestamp)).isEqualTo(timestamp)
    assertThat(eventToSub1?.attribute<Int>(TestAttr)).isEqualTo(TestAttrValue)

    assertThat(eventToSub2).isNotNull
    assertThat(eventToSub2?.type).isEqualTo(TestEvent)
    assertThat(eventToSub2?.renderStateId).isEqualTo(TestRenderStateId)
    assertThat(eventToSub2?.attribute<Long>(DebugEventAttribute.timestamp)).isEqualTo(timestamp)
    assertThat(eventToSub2?.attribute<Int>(TestAttr)).isEqualTo(TestAttrValue)

    assertThat(eventToSub1).isSameAs(eventToSub2)
  }

  @Test
  fun `test event should not be dispatched to subscriber when dispatcher is disabled`() {
    DebugEventDispatcher.enabled = false

    var event: DebugEvent? = null
    DebugEventBus.subscribe { TestEventSubscriber { e -> event = e } }

    DebugEventDispatcher.dispatch(type = TestEvent, renderStateId = { TestRenderStateId })

    assertThat(event).isNull()
  }

  @Test
  fun `test event should not be dispatched to subscriber after unsubscribing`() {
    var event: DebugEvent? = null
    val subscriber = TestEventSubscriber { e -> event = e }
    DebugEventBus.subscribe { subscriber }

    DebugEventDispatcher.dispatch(type = TestEvent, renderStateId = { TestRenderStateId })

    assertThat(event).isNotNull
    event = null

    DebugEventBus.unsubscribe(subscriber)

    DebugEventDispatcher.dispatch(type = TestEvent, renderStateId = { TestRenderStateId })

    assertThat(event).isNull()
  }

  @Test
  fun `multiple test events should be dispatched to subscriber`() {
    val events = mutableListOf<DebugEvent>()

    DebugEventBus.subscribe { TestEventSubscriber { e -> events.add(e) } }

    val timestamp = System.currentTimeMillis() - 1 // note: time in the past
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = timestamp,
    ) { map ->
      map[TestAttr] = TestAttrValue
    }
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId }, // note: no timestamp passed
    ) { map ->
      map[TestAttr] = "{$TestAttrValue}_1" // note: different attr value
    }

    assertThat(events.size).isEqualTo(2)
    assertThat(events[0].type).isEqualTo(TestEvent)
    assertThat(events[0].renderStateId).isEqualTo(TestRenderStateId)
    assertThat(events[0].attribute<Long>(DebugEventAttribute.timestamp)).isEqualTo(timestamp)
    assertThat(events[0].attribute<Int>(TestAttr)).isEqualTo(TestAttrValue)

    assertThat(events).isNotEmpty
    assertThat(events[1].type).isEqualTo(TestEvent)
    assertThat(events[1].renderStateId).isEqualTo(TestRenderStateId)
    assertThat(events[1].attribute<Long>(DebugEventAttribute.timestamp)).isGreaterThan(timestamp)
    assertThat(events[1].attribute<String>(TestAttr)).isEqualTo("{$TestAttrValue}_1")
  }

  @Test
  fun `test events should be dispatched to correct subscribers`() {
    var event: DebugEvent? = null
    DebugEventBus.subscribe { TestEventSubscriber { e -> event = e } }

    val notTestEvent = "Not${TestEvent}"
    var otherEvent: DebugEvent? = null

    DebugEventBus.subscribe {
      TestEventsSubscriber(notTestEvent, listener = { e -> otherEvent = e })
    }

    DebugEventDispatcher.dispatch(type = TestEvent, renderStateId = { TestRenderStateId })

    DebugEventDispatcher.dispatch(type = notTestEvent, renderStateId = { TestRenderStateId })

    assertThat(event).isNotNull
    assertThat(otherEvent).isNotNull
    assertThat(event).isNotEqualTo(otherEvent)
  }

  @Test
  fun `test event should be dispatched to all event subscriber`() {
    val events = mutableListOf<DebugEvent>()

    DebugEventBus.subscribe { TestEventsSubscriber(All, listener = { e -> events.add(e) }) }

    DebugEventDispatcher.dispatch(type = "a", renderStateId = { TestRenderStateId })
    DebugEventDispatcher.dispatch(type = "b", renderStateId = { TestRenderStateId })
    DebugEventDispatcher.dispatch(type = "c", renderStateId = { TestRenderStateId })
    DebugEventDispatcher.dispatch(type = "d", renderStateId = { TestRenderStateId })

    assertThat(events.size).isEqualTo(4)
  }

  @Test
  fun `trace event should be dispatched to subscriber`() {
    val traceTestAttr = "otherTestAttr"
    val traceTestAttrValue = "2"

    var event: DebugEvent? = null
    DebugEventBus.subscribe { TestEventSubscriber { e -> event = e } }

    val timestamp = System.currentTimeMillis() - 1 // note: time in the past

    DebugEventDispatcher.trace(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        attributesAccumulator = { attributes -> attributes[TestAttr] = TestAttrValue },
    ) { scope ->
      scope?.attribute(traceTestAttr, "2")
    }

    assertThat(event).isNotNull
    assertThat(event?.type).isEqualTo(TestEvent)
    assertThat(event?.renderStateId).isEqualTo(TestRenderStateId)
    assertThat(event?.attribute<Long>(DebugEventAttribute.timestamp)).isGreaterThan(timestamp)
    assertThat(event?.attribute<Duration>(DebugEventAttribute.duration)?.value).isGreaterThan(0)
    assertThat(event?.attribute<Int>(TestAttr)).isEqualTo(TestAttrValue)
    assertThat(event?.attribute<String>(traceTestAttr)).isEqualTo(traceTestAttrValue)
  }

  @Test
  fun `test event should be dispatched only if min log level is smaller than event log level`() {
    var event: DebugEvent? = null
    DebugEventBus.subscribe { TestEventSubscriber { e -> event = e } }

    DebugEventDispatcher.minLogLevel = LogLevel.VERBOSE
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = System.currentTimeMillis(),
        logLevel = LogLevel.VERBOSE) {
          mapOf<String, Any?>(TestAttr to TestAttrValue)
        }

    assertThat(event).isNotNull
    event = null

    DebugEventDispatcher.minLogLevel = LogLevel.VERBOSE
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = System.currentTimeMillis(),
        logLevel = LogLevel.DEBUG) {
          mapOf<String, Any?>(TestAttr to TestAttrValue)
        }

    assertThat(event).isNotNull
    event = null

    DebugEventDispatcher.minLogLevel = LogLevel.WARNING
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = System.currentTimeMillis(),
        logLevel = LogLevel.DEBUG) {
          mapOf<String, Any?>(TestAttr to TestAttrValue)
        }

    assertThat(event).isNull()
    event = null

    DebugEventDispatcher.minLogLevel = LogLevel.WARNING
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = System.currentTimeMillis(),
        logLevel = LogLevel.ERROR) {
          mapOf<String, Any?>(TestAttr to TestAttrValue)
        }

    assertThat(event).isNotNull
    event = null

    DebugEventDispatcher.minLogLevel = LogLevel.ERROR
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = System.currentTimeMillis(),
        logLevel = LogLevel.ERROR) {
          mapOf<String, Any?>(TestAttr to TestAttrValue)
        }

    assertThat(event).isNotNull
    event = null

    DebugEventDispatcher.minLogLevel = LogLevel.FATAL
    DebugEventDispatcher.dispatch(
        type = TestEvent,
        renderStateId = { TestRenderStateId },
        timestamp = System.currentTimeMillis(),
        logLevel = LogLevel.ERROR) {
          mapOf<String, Any?>(TestAttr to TestAttrValue)
        }

    assertThat(event).isNull()
    event = null
  }

  class TestEventSubscriber(val listener: (DebugEvent) -> Unit) : DebugEventSubscriber(TestEvent) {
    override fun onEvent(event: DebugEvent) {
      listener(event)
    }
  }

  class TestEventsSubscriber(
      vararg events: String,
      val listener: (DebugEvent) -> Unit,
  ) : DebugEventSubscriber(*events) {
    override fun onEvent(event: DebugEvent) {
      listener(event)
    }
  }
}