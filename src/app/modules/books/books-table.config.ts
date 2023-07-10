import { CdkTableColumnDataType } from "@crystal/ng-cdk-table";
export const booksTableConfig = {
    displayedColumns: ['isbn', 'title', 'genre', 'authorName', 'rating', 'dateOfPublication', 'url', 'comment'],
    tableColumnDefinitions: [
      {
        id: 'isbn',
        name: 'ISBN',
        dataType: CdkTableColumnDataType.String,
        sortable: true
      }, {
        id: 'title',
        name: 'Title',
        dataType: CdkTableColumnDataType.String,
        sortable: true
      }, {
        id: 'genre',
        name: 'Genre',
        dataType: CdkTableColumnDataType.String,
        sortable: true
      }, {
        id: 'authorName',
        name: 'Author Name',
        dataType: CdkTableColumnDataType.String,
        sortable: true
      }, {
        id: 'rating',
        name: 'Rating',
        dataType: CdkTableColumnDataType.Number,
        sortable: true
      },
      {
        id: 'dateOfPublication',
        name: 'Date Of Publication',
        dataType: CdkTableColumnDataType.Date,
        sortable: true
      },
      {
        id: 'url',
        name: 'Link',
        dataType: CdkTableColumnDataType.String,
        sortable: true
      },
      {
        id: 'comment',
        name: 'Comment',
        dataType: CdkTableColumnDataType.String,
        sortable: true
      }
    ],
  };