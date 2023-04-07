import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent {
	@Input() tableGridData:TableMetaData | undefined;
	@Output() editAction = new EventEmitter<string>();
	@ViewChild(MatTable,{static:true}) table: MatTable<any> | undefined;
	@ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
	
	public tableData:any = {data:[],metaData:{}};
	public dataSource:any;
	public values: Array<any> = [];
	public tempDatasource: any;
	public rowNumber:any;
	colored: any[] = []

	readonly separatorKeysCodes: number[] = [13, 9, 188];
	isView: string = 'auto';
	dropdownShow: boolean = false;
	filters: {} = {};
	columns: any;

	update() {
		this.isView = this.tableData.metaData.view ? 'pointer' : 'auto'
		this.tableData = this.tableGridData;
		this.columns = this.tableData.metaData.column_names

		this.tempDatasource = this.tableGridData!.data;
		this.tempDatasource = this.tableGridData!.data
		this.tableData.metaData.column_names = this.tableData.metaData.column_names.concat(['edit']);
		this.dataSource = new MatTableDataSource<any>(this.tableData.data);
		this.dataSource.sort = this.sort;
		}

	fetchRowNumberEdit(rowData:any) {
		this.rowNumber = this.tempDatasource.indexOf(rowData);
		console.log(this.rowNumber)
		this.editAction.next(this.rowNumber);
	  }
}

export interface TableMetaData{
	data:{}[],
	metaData:{
		column_names:string[],
		display_names:{[key:string]:string},
		editable_columns?:string[],
		badgesColumn?:string,
		disableBadges?:boolean,
		allSelected?:boolean,
		view?:boolean,
		edit?:boolean,
		search?:boolean,
		placeholder?:string,
		selectAttr?:string,
		error?:string,
		buttonName?: string,
		validations?:{[key:string]: Validators},
		managerFunction?: string,
		itemName?: string,}
	}

