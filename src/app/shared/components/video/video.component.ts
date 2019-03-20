import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import videojs from 'video.js';
import 'videojs-flash';
import 'videojs-playlist';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video: ElementRef;
  @Input() src: any;
  @Input() poster: string;
  @Input() playlist: any[];
  @Input() startIndex: number;
  @Input()
  get autoplay(): boolean {
    return this._autoplay;
  }
  set autoplay(value: boolean) {
    this._autoplay = this.coerceBooleanProperty(value);
  }
  private _autoplay = false;
  @Input()
  get fluid(): boolean {
    return this._fluid;
  }
  set fluid(value: boolean) {
    this._fluid = this.coerceBooleanProperty(value);
  }
  private _fluid = false;

  player: any;

  constructor(
    private androidFullScreen: AndroidFullScreen,
    private screenOrientation: ScreenOrientation
  ) {}

  ngAfterViewInit() {
    this.player = videojs(this.video.nativeElement, {
      html5: {
        hls: {
          overrideNative: true
        }
      },
      flash: {
        swf: 'assets/swf/video-js.swf'
      }
    });
    if (this.playlist) {
      this.player.playlist(this.playlist);
      this.player.playlist.autoadvance(0);
      this.player.playlist.currentItem(this.startIndex);
      if (this.playlist.length > 1) {
        const Button = videojs.getComponent('Button');

        const PreviousButton = videojs.extend(Button, {
          constructor: function(player, options) {
            Button.call(this, player, options);
            this.controlText('Previous');
          },
          buildCSSClass: function() {
            return `vjs-previous-control ${Button.prototype.buildCSSClass.call(this)}`;
          },
          handleClick: event => {
            this.player.playlist.previous();
          }
        });
        videojs.registerComponent('PreviousButton', PreviousButton);
        this.player.controlBar.addChild('PreviousButton', {}, 0);

        const NextButton = videojs.extend(Button, {
          constructor: function(player, options) {
            Button.call(this, player, options);
            this.controlText('Next');
          },
          buildCSSClass: function() {
            return `vjs-next-control ${Button.prototype.buildCSSClass.call(this)}`;
          },
          handleClick: event => {
            this.player.playlist.next();
          }
        });
        videojs.registerComponent('NextButton', NextButton);
        this.player.controlBar.addChild('NextButton', {}, 2);
      }
    } else {
      this.player.src(this.src);
      this.player.poster(this.poster);
    }
    this.player.autoplay(this.autoplay);
    this.player.fluid(this.fluid);
    this.player.on('fullscreenchange', event => {
      if (this.player.isFullscreen()) {
        this.androidFullScreen.immersiveMode();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      } else {
        this.androidFullScreen.showSystemUI();
        this.screenOrientation.unlock();
      }
    });
  }

  ngOnDestroy() {
    this.player.dispose();
  }

  coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }
}
