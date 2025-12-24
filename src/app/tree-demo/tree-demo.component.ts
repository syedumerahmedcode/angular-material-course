import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
    selector: 'tree-demo',
    templateUrl: 'tree-demo.component.html',
    styleUrls: ['tree-demo.component.scss'],
    standalone: false
})
export class TreeDemoComponent implements OnInit {

  /**
   * Data source for nested tree.
   * The data source for nested tree doesn't have to consider node flattener, or the way to expand or collapse. 
   * The expansion/collapsion will be handled by TreeControl and each non-leaf node.
   * The datasource take a generic parameter the type of the node.
   */
  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();

  /**
   * take a generic parameter the type of the node.
   * It needs a function which extracts the children of the node.
   */
  nestedTreeControl=new NestedTreeControl<CourseNode>(node => node.children);

  ngOnInit() {
    this.nestedDataSource.data = TREE_DATA;

  }

  hasNestedChild (index: number, node: CourseNode) {
    return node?.children?.length > 0;
  }

}


