export type TNode = 'file' | 'folder'
export interface Node {
  id: string;
  name: string;
  type: TNode;
  children?: Node[];
}
