export interface MenuItem {
  id: string
  label: string
  url: string
  path?: string
  target?: string
  description?: string
  parentId?: string | null
  childItems?: {
    nodes: MenuItem[]
  }
}
