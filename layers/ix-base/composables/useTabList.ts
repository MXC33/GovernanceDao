export const useTabList = <T extends string>(tabs: readonly T[]) => {
  type Tab = typeof tabs[number]

  const activeTab = ref<Tab>()
  activeTab.value = tabs[0]

  const isTabActive = (tab: Tab) =>
    activeTab.value == tab

  const onClickTab = (tab: Tab) =>
    activeTab.value = tab

  return {
    tabs,
    activeTab,
    onClickTab,
    isTabActive
  }
}