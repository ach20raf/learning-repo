import { Component, OnInit, Inject, ViewChild } from '@angular/core';
//import { RestDataApiService } from 'src/app/services/data/rest-data-api.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from '../Service/folder.service';
import { Folder } from '../modules/folder/folder.module';
import { DataSharingService } from '../Service/data-sharing.service';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-folderslist-year',
  templateUrl: './folderslist-year.component.html',
  styleUrls: ['./folderslist-year.component.scss'],
})
export class FolderslistYearComponent implements OnInit {

 
  public lastWeekFolders: Folder[];
  public lastMonthFolders: Folder[];
  public totalweekpage:number;
  public totalMonthpage:number;
  public totaloldpage:number;
  public totaloldpage2:number [];
   public ActiveIndex:number ;
   public NextSlide:number ;
  public indexPage:number = 0;
  public OLDFolders: Folder[];
  public pageNumber: number = 0;
  public pageSize: number = 8;
  public pageNumberMonth: number = 0;
  public pageSizeMonth: number = 8;
  public pageNumberOld: number = 0;
  public NBel: number = 0;
  public NBelstock: number = 0;
  public load:boolean=true;
  
 
  public pageSizeOld: number = 8;
  public favoriteFoldersIds: string[];
  public isLoading: boolean;
  public countOfLastMonth;
  public countOfLastWeek;
  public countOld;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;


  sliderOne: any;



  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false
  };
 
  constructor( private folderService: FolderService,
              public share : DataSharingService,
              private rest:RestDataApiService,
              private router: Router,
              //private modal : NgbModal
              ) {}
 //Get Activeslide

   //Move to Next slide/
   /*
  slideNext(object, slideView) {
    slideView.slideNext().then(() => {
      this.checkIfNavDisabled(object, slideView);
      console.log('Test slide Next');
    });

  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev().then(() => {
      this.checkIfNavDisabled(object, slideView);
    //  console.log('Test slide Prev');
    });;
  }*/
  LoadNext(){
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log('Next/'+res);
     this.getAllFoldersOLD(res);
     if((this.totaloldpage-1)==this.ActiveIndex){
       this.NBelstock=this.countOld;
    
    }else{
      this.NBelstock+=this.NBel;
    }
    
     console.log('numberofelement/'+this.NBel);
     console.log('varstock/'+this.NBelstock);
    })
//console.log('Next'+re)
    
  }
  Loadprev(){
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log('Prev/'+res);
     this.getAllFoldersOLD(res);
     this.NBelstock-=this.NBel;
     console.log('numberofelement/'+this.NBel);
     console.log('varstock/'+this.NBelstock);
     console.log('countold/'+this.countOld);
    })
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
   
   /* console.log('Test slide OnChange');
    
    
    //this.getAllFoldersOLD(this.indexPage);
    
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log(res);
    })
    console.log('swiper'+this.slideWithNav.getSwiper);
    this.slideWithNav.getPreviousIndex().then(res=>{
     
     //console.log('SlidePrevious '+res);
    })
   /* if(this.indexPage+1<=this.totaloldpage){
      this.indexPage++;
    }*/
     //slideView.slideNext(console.log('slideNext'));
   //  slideView.slidePrev(console.log());
   // console.log(this.indexPage);
    //console.log(this.totaloldpage);
    /*console.log(this.slideWithNav.getActiveIndex());
    console.log(this.slideWithNav.getPreviousIndex());
    console.log(this.slideWithNav.getSwiper());
    if (this.slideWithNav.isEnd()) {
     
    }*/
   
   
  }
 

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
   // console.log('Test slide Navdisabled');
  }
 
  checkisBeginning(object, slideView) {
    /*slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
     // console.log('Test slide beginning');
    });*/
  }
  checkisEnd(object, slideView) {
   /* slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    //  console.log('Test slide ENd');
    });*/
  }


        



              goTo(to: string) {
                this.router.navigate([to]);
              }
              
              
  next() {
    this.pageNumber += 1;
    this.getAllFolders();
  }
  Previous() {
    this.pageNumber -= 1;
    this.getAllFolders();
   
  }
  nextMonth() {
    this.pageNumberMonth += 1;
    this.getAllFoldersMonth();
  }
  PreviousMonth() {
    this.pageNumberMonth -= 1;
    this.getAllFoldersMonth();
   
  }
  nextOLD() {
    this.pageNumberOld += 1;
    this.NBel+=this.NBel;
    this.getAllFoldersOLD(this.indexPage);
  }
  PreviousOLD() {
    this.pageNumberOld -= 1;
    this.NBel-=this.NBel;
    this.getAllFoldersOLD(this.indexPage);
   
  }
 /* ionViewWillEnter(){
    console.log('kill')
    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;
      this.getAllFolders();
      this.getAllFoldersMonth();
      this.getAllFoldersOLD(this.indexPage);
      this.isLoading = true;
      this.CountFolderRecent();
     // this.NBelstock=this.NBel;
      //this.test=this.NBel;
    });
  }*/
  ngOnInit(): void {
    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;
      this.getAllFolders();
      this.getAllFoldersMonth();
      this.getAllFoldersOLD(this.indexPage);
      this.isLoading = true;
      this.CountFolderRecent();
     // this.NBelstock=this.NBel;
      //this.test=this.NBel;
    });
    
  }
  getAllFolders(){
    this.folderService.getAllFolders(this.indexPage,this.pageSize)
      .subscribe(folders => {
        this.lastWeekFolders = folders.content;
        this.countOfLastWeek = folders.totalElements;
      
        this.totalweekpage=folders['totalPages'] as number;
     

      })
  }
  getAllFoldersMonth(){
    this.folderService.getAllFoldersMonth(this.pageNumberMonth,this.pageSizeMonth)
      .subscribe(folders => {
        this.lastMonthFolders = folders.content;
        this.countOfLastMonth=folders.totalElements;
        this.totalMonthpage=folders['totalPages'] as number;
      })
  }
  getAllFoldersOLD(i:number){
    this.folderService.getAllFoldersOLD(i,this.pageSizeOld)
      .subscribe(folders => {
      //  this.NBel+=this.NBel;
        this.OLDFolders = folders.content;
        this.countOld=folders.totalElements;
        this.NBel=folders['numberOfElements']  as number;
        this.totaloldpage=folders['totalPages'] as number;
        this.totaloldpage2=new Array<number>(this.totaloldpage);
        if(this.load){
          this.NBelstock=this.NBel;
          this.load=false;
        }
      
      })
  }
  
  addToFavorite(folderId: number){
    this.folderService.addToFavorite(folderId)
    .subscribe(res => {
     
      this.folderService.getFAvoritFoldersIds().subscribe(ids => {
        this.favoriteFoldersIds = ids;
        this.getAllFolders();
        this.getAllFoldersMonth();
        this.getAllFoldersOLD(this.indexPage);
        this.isLoading = true;
        this.CountFolderRecent();
      });
    })
  }
  isFavorite(folder: Folder)  {
  
      return this.favoriteFoldersIds.indexOf(folder.id) >= 0;
  }
  CountFolderRecent(){
    this.folderService.CountFolderrecent()
      .subscribe(res => {
   
       
      
      })
  }


  DeleteFavoritefolder(folderId: number){
    this.folderService.deletefavoritefolder(folderId)
    .subscribe(res => {
      this.ngOnInit();
    })
  }

}
