import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  authUser: any;
  currentUser: any = {};
  currentPage: string = '';
  isLoading: boolean = false;
  currentTab: string = '';
  permission: boolean = false;
  posts: Post[] = [];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.isLoading = true;
    this.currentUser = this.userService.curUser;
    this.authUser = this.loginService.authUser;
    this.findRequest();
    this.isFriend();
    if (this.currentPage == this.authUser.account.username) {
      this.permission = true;
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
      this.userService.getUserByUsername(this.currentPage).subscribe((res) => {
        this.currentUser = res;
        this.userService.curUser = res;
        this.postService
          .getPostByUser(this.currentUser.account.username)
          .subscribe((res) => {
            this.posts = res.posts;
          });
        if (this.currentPage == this.authUser.account.username) {
          this.permission = true;
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      });
    });
  }

  followUser() {}

  findRequest(): boolean {
    if (this.currentUser && this.currentUser.request) {
      return this.currentUser.request.some((request: any) => {
        return request._id === this.authUser._id;
      });
    }
    return false;
  }

  isFriend(): boolean {
    // Search in friends list myUser check if currentUser is friend
    return this.authUser.friends.some((friend: any) => {
      return friend._id === this.authUser._id;
    });
  }

  changeTab(tab: string) {
    console.log(tab);
    this.currentTab = tab;
  }
}
