import React, { PropsWithChildren, useContext, useReducer } from 'react';
import { Node } from '../models';
import { treeData } from '../constants';

type Action =
  | { type: 'ADD_NODE'; payload: { newNode: Node } }
  | { type: 'DELETE_NODE'; payload: { id: string } }
  | {
      type: 'SELECT_NODE';
      payload: { id: string; parentId?: string; type: string };
    };

interface ReducerState {
  nodes: Node[];
  selected?: { id: string; type: string; parentId?: string };
}
const TreeContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<Action>;
}>({ state: { nodes: [] }, dispatch: () => {} });

const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case 'SELECT_NODE': {
      return {
        ...state,
        selected: action.payload,
      };
    }
    case 'ADD_NODE': {
      const { selected } = state;
      if (!selected?.parentId && selected?.type == 'file') {
        return {
          ...state,
          nodes: [...(state.nodes || []), action.payload.newNode],
        };
      }
      const updater = (nodes: Node[]): Node[] => {
        return nodes.map((node) => {
          if (node.id == selected?.id && node.type == 'folder') {
            return {
              ...node,
              children: [...(node.children || []), action.payload.newNode],
            };
          }
          if (node.id == selected?.parentId && selected.type == 'file') {
            return {
              ...node,
              children: [...(node.children || []), action.payload.newNode],
            };
          }
          return { ...node, children: updater(node.children || []) };
        });
      };
      return {
        ...state,
        nodes: updater(state.nodes),
      };
    }
    case 'DELETE_NODE': {
      const updater = (nodes: Node[]): Node[] => {
        const { selected } = state;
        return nodes
          .filter((node) => node.id != action.payload.id)
          .map((node) => {
            return {
              ...node,
              children: updater(node.children || []),
            };
          });
      };
      return {
        ...state,
        nodes: updater(state.nodes),
      };
    }
    default:
      return state;
  }
};
export const TreeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { nodes: treeData });
  return (
    <TreeContext value={{ state, dispatch }}>
      {children}
    </TreeContext>
  );
};

const useTree = () => useContext(TreeContext);
export default useTree;
