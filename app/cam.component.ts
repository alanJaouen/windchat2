import {ViewChild, ViewChildren, Component, QueryList, ElementRef} from '@angular/core'

@Component({
  selector: 'cam',
  template: `
  <div id="cam">
    <h2>Video</h2>
    <video #video width="640" height="480" autoplay></video>
  </div>
`
})
export class Cam {
  @ViewChild('myname') input:ElementRef; 
  @ViewChild('video') video:ElementRef;
  _video:any;
  
  @ViewChildren('div1,div2,div3') divs:QueryList<ElementRef>;
  
  ngAfterViewInit() {
    let _video=this.video.nativeElement;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
                            .then(stream => {
                              _video.src = window.URL.createObjectURL(stream);
                              _video.play();
                              this._video = _video;
                            })
    }

  }

  getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = this._video.width;
        hiddenCanvas.height = this._video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(this._video, 0, 0, this._video.width, this._video.height);
        return ctx.getImageData(x, y, w, h);
    };
  function() {
        if (this._video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = this._video.width;
            patCanvas.height = this._video.height;
            var ctxPat = patCanvas  .getContext('2d');

            var idata = this.getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

        }
    };
}