import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'CRUD With Localstorage';
  posterData: any[] = [];
  posterForm: any;
  button = 'Add Data';
  editId: any;

  constructor(private formBuilder:FormBuilder) {
    this.posterForm = this.formBuilder.group({
      userid: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.posterData = JSON.parse(localStorage.getItem('posterData') || '[]');
    console.log(this.posterData);
  }

  deleteData(id: any) {
    this.posterData.forEach((element: any, i: any) => {
      if (element.id == id) {
        this.posterData.splice(i, 1);
      }
    });
    let abc: any = this.posterData;
    this.posterForm.reset();
    this.button = 'Add Data';
    localStorage.setItem('posterData', JSON.stringify(abc));
  }

  addData(button: any) {
    if (button == 'Add Data') {
      let abc: any = JSON.parse(localStorage.getItem('posterData') || '[]');

      const obj = {
        userId: this.posterForm.value.userid,
        title: this.posterForm.value.title,
        body: this.posterForm.value.body,
        id: new Date().getTime().toString(),
      };
      abc.push(obj);
      localStorage.setItem('posterData', JSON.stringify(abc));
      this.posterData = abc;
      this.posterForm.reset();
    } else {
      let abc = JSON.parse(localStorage.getItem('posterData') || '[]');
      console.log(abc);

      abc.forEach((element: any, i: any) => {
        if (element.id == this.editId) {
          const obj = {
            userId: this.posterForm.value.userid,
            title: this.posterForm.value.title,
            body: this.posterForm.value.body,
            id: element.id,
          };
          abc.splice(i, 1, obj);
        }
      });
      localStorage.setItem('posterData', JSON.stringify(abc));
      this.posterData = abc;
      this.button = 'Add Data';
      this.posterForm.reset();
    }
  }

  getData(id: any) {
    this.button = 'Update Data';
    this.editId = id;

    let abc = JSON.parse(localStorage.getItem('posterData') || '[]');
    console.log(abc);

    abc.map((item: any) => {
      if (item.id == id) {
        console.log('selected data', item);
        this.posterForm = this.formBuilder.group({
          userid: [item['userId']],
          title: [item['title']],
          body: [item['body']],
        });
      }
    });
  }

  deleteAll() {
    localStorage.clear();
    this.posterData = [];
  }

  searchValue(event: any) {
    console.log(event.target.value);
    let searchItem: any[] = [];
    let searchcontain: any = event.target.value;
    this.posterData.filter((val: any) => {
      if (Number.parseInt(searchcontain) == val.userId) {
        searchItem.push(val);
        this.posterData = searchItem;
        console.log('data match',this.posterData);
      } else if (searchcontain == '') {
        console.log('not search');
        this.posterData = JSON.parse(localStorage.getItem('posterData') || '[]');
      }else{
        console.log('data not match')
        
      }
    });
  }
}
