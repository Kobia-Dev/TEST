import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from 'src/app/market-place/services/data.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; 
  yaxis: ApexYAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
import { Subject } from 'rxjs';
import { ManufacturerService } from 'src/app/admin/services/manufacturer.service';
import { DeleteManufacturersComponent } from '../delete-manufacturers/delete-manufacturers.component';
import { ViewManufacturersComponent } from '../view-manufacturers/view-manufacturers.component';
@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {

  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'phoneNo', 'numberPlate', 'available', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  currentPage = 1;
  driversPerPage = 10;
  destroy$: Subject<boolean> = new Subject<boolean>();
  driver_entity: any;
  driver_user: any;
  isLoading = true;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;
  router: any;
  drivers: any;

  constructor(
    private manufacturerService: ManufacturerService,
    private dataService: DataService,
    private dialog: MatDialog,) {
    this.chartOptions1 = {
      series: [
        {
          name: "To the buyer",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "To the Warehouse",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "To the farmers",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        width: 450,
        height: 500,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Successful Trips",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " Kshs";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " Kshs";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " Kshs";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " Kshs";
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
    //   
  }

  ngOnInit(): void {
    this.loadManufacturers();
    this.dataService.getUpdateData().subscribe(() => {
      this.loadManufacturers();
    });
   
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public refresh(){
    this.loadManufacturers();
  }
  
  public loadManufacturers() {
    this.manufacturerService.getAllManufacturers().subscribe({
      next: ((res) => {
        console.log("Drivers: ", res.entity);
        this.driver_entity = res.entity;
        this.driver_user = res.entity.user;
        this.dataSource = new MatTableDataSource(this.driver_entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }),

      error: ((error) => {
        console.log("error fetching manufacturers: ", error);
      }),
      complete: (() => { })
    });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public viewRecord(row : any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(ViewManufacturersComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

  public deleteRecord(row : any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(DeleteManufacturersComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
}

