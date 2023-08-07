<template lang="pug">
VList(w="full" flex-shrink="0")
  TableNewRow(v-for="(row, index) in rows" :key="row.originalIndex ?? index")
    HList(v-if="selectable" :context="context" b="b-1 gray-600" min-h="80px" items="center" p="l-4 r-4 md:(l-6 r-6)")
      InputCheckbox(:model-value="isSelected(index)" @update:modelValue="val => onSelect(index, val)")

    TableNewCell(v-for="column in columns" pos="on-buttons:(sticky right-0)" :buttons="column.type == 'buttons'" p="on-buttons:r-6 on-mobile:!r-4" :is-button="isButtonCell" :is-open="isMenuOpen" :mobile="isMobile") 
      template(v-if="loading")
        HelperSkeleton(h="6" flex-grow="1" mr="6")

      template(v-else)
        HList(v-if="column.type == 'buttons' && !isMobile" space-x="3" justify="end" w="full")
          slot(:name="getColumnKey(column)" :buttons="column.buttons" :row="row")
            TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

        //- ... MENU
        HList(v-else-if="column.type == 'buttons'")
          VList(v-if="!openRows.includes(index)" bg="gray-600" w="8" h="8" justify="center" items="center" space-y="1" py="2" cut="bottom-right s-sm b-gray-600" @click="actionMenu(index)")
            div(rounded="full" bg="white" w="1" h="1")
            div(rounded="full" bg="white" w="1" h="1")
            div(rounded="full" bg="white" w="1" h="1")

          HList(v-else-if="openRows.includes(index)" space-x="3")
            CloseIcon(w="5" fill="ix-ne" @click="closeMenu(index)")
            slot(:name="getColumnKey(column)" :buttons="column.buttons" :row="row" )
              TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

        slot(v-else :name="`item-${column.rowKey}`" :row="row" :column="column")
          TableCellValue(:column="column" :row="row" :context="context")
</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { TableColumn, TableRow } from '~/composables/useTable'
import CloseIcon from '~/assets/icons/close.svg'

const { getColumnKey } = useTable()

const { isMobile } = useDevice()

const { rows, columns, loading, selectable } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  loading?: boolean,
  selectable?: boolean,
  context?: CollectionContext
}>()

const selectedItems = defineModel<number[]>()

const isSelected = (index: number) =>
  selectedItems.value?.includes(index)

const onSelect = (index: number, val: boolean) => {
  if (!selectedItems.value)
    return

  const hasItem = selectedItems.value.indexOf(index) > -1

  if (hasItem && !val)
    return selectedItems.value = selectedItems.value.filter((item) => item != index)

  if (val && !hasItem)
    return selectedItems.value = [...selectedItems.value, index]
}

const openRows = ref<number[]>([])

const actionMenu = (index: number) => {
  selectedItems.value?.includes(index)
  isSelected(index)

  if (openRows.value.includes(index)) {
    openRows.value = openRows.value.filter(row => row !== index)
  } else {
    openRows.value.push(index)
  }
}

const isMenuOpen = computed(() => {
  return openRows.value.length > 0
})

const closeMenu = (index: number) => {
  openRows.value = openRows.value.filter(row => row !== index)
}

const isButtonCell = computed(() => {
  const buttonCell = columns.some(column => column.type == 'buttons')

  if (buttonCell)
    return true
  else false
})

</script>