import {
  Component,
  Output,
  EventEmitter,
  Inject,
  Injectable,
  ReflectiveInjector
} from '@angular/core';
class Address {
  constructor(province, city, district, street) {
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
  public province: string;
  public city: string;
  public district: string;
  public street: string;

  get_addr() {
    return `
      ${this.province} ${this.city} ${this.district} ${this.street}
    `;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  production = false;
  get() {
    if (this.production) {
      return 'get from xxx.xxxx.xxxx.xxx success';
    }
    return 'get from xxx.xxxx.xxxx.xxx success';
  }
}

//显式依赖注入
const injector = ReflectiveInjector.resolveAndCreate([
  {
    provide: Address,
    useFactory: () => {
      return new Address('辽宁', '沈阳', '和平区', 'xx街xx号');
    }
  },
  {
    provide: ApiService,
    useFactory: () => {
      return new ApiService();
    }
  }
]);

let addr = injector.get(Address);
console.log(addr.get_addr());

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html',
  providers: [ApiService]
})
export class DemoComponent {
  constructor(private api: ApiService) {}
  message: string;
  request() {
    return this.api.get();
  }
}
