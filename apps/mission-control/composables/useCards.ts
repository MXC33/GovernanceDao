import { NftFragment } from "#gql"
import { OrderTask } from "./useTasks"

export type CardState = 'active' | 'inactive' | 'disabled' | 'overview' | 'build' | 'task' | 'bundle'

export interface CardBlockItem extends NftFragment, OrderTask {
  state?: CardState
}