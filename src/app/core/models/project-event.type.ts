export type ProjectEventName =
  | 'project:created'
  | 'project:init'
  | 'project:file:imported'
  | 'project:tree:updates'
  | 'project:item:added'
  | 'project:item:removed'
  | 'project:item:selected'
  | 'project:item:updated'
  | 'project:item:moved'
  | 'project:item:transformed'
  | 'project:item-path:updated';
