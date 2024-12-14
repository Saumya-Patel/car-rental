import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  private formData:any;
  private isFormSubmittedValue:boolean

  constructor(private http: HttpClient) { }

  baseApiUrl = 'http://localhost:35337/api/';
  ApiUrl = 'http://localhost:35337/api/user';

  placeOrder(customerId: any, cartData: any[]) {
    return this.http.post<any>(this.baseApiUrl + '/product/OrderProduct/' + customerId, cartData);
  }

  LoginCustomer(data: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl + '/login', data);
  }

  RegisterCustomer(data: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl + '/register', data);
  }

  ManageCar(data: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + 'car/post', data);
  }

  getAllCars(): Observable<any>{
    return this.http.get<any>(this.baseApiUrl+ 'car/allcars');
  }

  getCarDetail(id:Number): Observable<any>{
    return this.http.get<any>(this.baseApiUrl+ 'car/detail/'+id.toString());
  }

  setIsFormSubmitted(data:boolean){
    this.isFormSubmittedValue=data;
  }

  getIsFormSubmitted(){
    return this.isFormSubmittedValue
  }
  setRentalFormData(data:any){
    this.formData=data;
  }

  getRentalFormData(){
    return this.formData;
  }

  checkIsAvailable(id:any):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'rental/isavailable/'+id);
  }

  postRentInfo(rentInfo: any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'rental/rent',rentInfo);
  }

  getUserRentals(id:any):Observable<any>{
    console.log('myrental userid',id);
    return this.http.get<any>(this.baseApiUrl+'rental/rentalAgreements/'+id);
  }

  getRentalByRentId(id:any):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'rental/singlerentalagreements/'+id);
  }

  getAllRentals():Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'rental/allRentalAgreements');
  }

  editRentalAgreement(id:any, editedRentInfo:any):Observable<any>{
    return this.http.put<any>(this.baseApiUrl+'rental/editrental/'+id,editedRentInfo);
  }

  deleteRental(id:any,userId:any):Observable<any>{
    return this.http.delete<any>(this.baseApiUrl+'rental/deleterental/'+id+"/"+userId);
  }

  // GetProductList(): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl+'/product/GetAllProducts');
  // }

  // GetProductById(id:any): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl+'/product/GetProductById/'+id);
  // }

  // GetAllCategory(): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl+'/product/GetAllCategory');
  // }

  // DeleteProduct(id:any){
  //   return this.http.delete(this.baseApiUrl+'/product/DeleteProduct/'+id);
  // }

  // EditProduct(id:any,data:any){
  //   return this.http.put(this.baseApiUrl+'/product/EditProductById/'+id,data);
  // }

  // GetMyOrders(id:any): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl+'/product/GetMyOrders/'+id);
  // }

}

