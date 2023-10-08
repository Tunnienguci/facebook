import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() posts: any[] = [];
  @Input() currentUser: any;
  @Input() myUser: any;

  currentPage: string = '';

  userName = localStorage.getItem('_saBareUser');

  editable: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
    });
  }

  checkStatusLike(arr: any) {
    const index = arr.findIndex((item: any) => item === this.myUser._id);
    if (index > -1) {
      return true;
    }
    return false;
  }

  removePost(id: any) {
    this.postService.removePost(id, this.currentPage);
  }

  openLink(link: any) {
    // this.router.navigate(['/post', link]);
  }

  likePost(id: any) {
    this.postService.likePost(id, this.myUser._id, this.currentPage);
  }

  calculateTime(time: any) {
    const currentTime = new Date().getTime();
    const postTime = new Date(time).getTime();
    const timeAgo = currentTime - postTime;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    if (timeAgo < minute) {
      return `${Math.floor(timeAgo / 1000) + 1} seconds ago`;
    } else if (timeAgo < hour) {
      const minutes = Math.floor(timeAgo / minute);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (timeAgo < day) {
      const hours = Math.floor(timeAgo / hour);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (timeAgo < month) {
      const days = Math.floor(timeAgo / day);
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else {
      const months = Math.floor(timeAgo / month);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    }
  }

  copyLink(link: any) {
    // this.router.navigate(['/post', link]);
  }
}