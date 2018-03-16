import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShareButtons} from '@ngx-share/core';

@Component({
  selector: 'app-sharebuttons',
  templateUrl: './sharebuttons.component.html',
  styleUrls: ['./sharebuttons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharebuttonsComponent implements OnInit {

  constructor(public share: ShareButtons) { }

  ngOnInit() {
  }

}
