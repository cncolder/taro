import type { Component, ComponentClass } from 'react'
import VueCtor, { ComponentOptions, VNode } from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'
import { MpEvent } from '../dom/event'
import { TaroElement } from '../dom/element'

export interface Instance<T = {}> extends Component<T>, Show, PageInstance {
  tid?: string
  $forceUpdate?(): void
  $nextTick?(cb: () => void): void
  $options: Instance
}

export interface VueAppInstance extends ComponentOptions<VueCtor> {
  $options: AppInstance
}

export type VueInstance<M = object, P = object> = CombinedVueInstance<VueCtor, object, M, P, Record<never, any>> & VueInternal

interface VueInternal {
  _render(): VNode
  _update(vnode: VNode, hyrate: boolean): void
}

export interface PageProps {
  tid?: string
}

export interface ReactPageComponent<T = PageProps> extends ComponentClass<T>, Show, PageInstance {
  //
}

export interface ReactPageInstance<T = PageProps> extends Component<T>, Show, PageInstance {
  //
}

export interface ReactAppInstance<T = AppInstance> extends Component<T>, Show, AppInstance {
  //
}

export interface PageLifeCycle extends Show {
  onPullDownRefresh?(): void
  onReachBottom?(): void
  onPageScroll?(obj: { scrollTop: number }): void
  onShareAppMessage?(obj: { from: string, target?: TaroElement, webViewUrl: string }): void
  onResize?(options: unknown): void
  onTabItemTap?(obj: { index: string, pagePath: string, text: string }): void
  componentWillPreload?(): void
  onTitleClick?(): void
  onOptionMenuClick?(): void
  onPopMenuClick?(): void
  onReady?(): void
  onPullIntercept?(): void
  eh?(event: MpEvent): void
  onLoad(options: Record<string, unknown>): void
  onUnload(): void
}

export interface PageInstance extends PageLifeCycle {
  data?: Record<string, unknown>
  path?: string
  options?: Record<string, unknown>
}

interface Show {
  componentDidShow?(options?: unknown): void
  componentDidHide?(options?: unknown): void
  onShow?(options?: unknown): void
  onHide?(options?: unknown): void
}

export interface AppInstance extends Show {
  onLaunch? (options?: string): void
  mount? (component: React.ComponentClass | ComponentOptions<VueCtor>, id: string, cb: () => void): void
  unmount? (id: string, cb: () => void): void
}
