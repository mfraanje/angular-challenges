import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <button *ngIf="topics$ | async as topics" (click)="openTopicModal(topics)">Open Topic</button>
  `, 
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  private dialog: MatDialog;
  private topicService: TopicService;
  topics: TopicType[] = [];
  topics$: Observable<TopicType[]>;

  constructor(dialog: MatDialog, topicService: TopicService) {
    this.dialog = dialog;
    this.topicService = topicService;
    this.topics$ = this.topicService
      .fakeGetHttpTopic()
      .pipe(take(1))
      
  }

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: topics,
      },
    });
  }
}
