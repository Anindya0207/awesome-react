// Node Type
export interface Node {
  id: string;
  label: string;
  type: 'file' | 'folder';
  children?: Node[];
}
