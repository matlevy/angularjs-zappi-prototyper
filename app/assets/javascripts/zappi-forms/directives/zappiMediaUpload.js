define(['./module'], function (directives) {

  directives.directive("zappiMediaUpload", ["$timeout", "$interval", "MediaObjectService", "MediaUploaderService", function($timeout,$interval,MediaObjectService,MediaUploaderService){
    return {
      restrict: 'E',
      scope: {
        isVisible: "=?",
        mediaFile: "=?",
        mediaObject: "=?",
        mediaObjectFactory: "=?",
        mediaUploaderFactory: "=?",
        mediaObjectType: "@",
        onMediaUploaded: "=?",
        onMediaChosen: "=?",
        onMediaRemoved: "=?",
        label: "="
      },
      transclude: true,
      controller: function($scope, $element) {

        $scope.states = MediaObjectService.states;

        if( $scope.mediaObjectFactory == null )
          $scope.mediaObjectFactory = MediaObjectService.factory;

        if( $scope.mediaUploaderFactory == null )
          $scope.mediaUploaderFactory = MediaUploaderService.factory;

        if( $scope.label == null )
          $scope.label = "Click to browse for file or drag and drop here";

        $scope.addFileEventListenersToCurrentUploader = function(){
          $scope.getCurrentFileUploadElement().on('dragover', $scope.onFileDragOver );
          $scope.getCurrentFileUploadElement().on('dragenter', $scope.onFileDragOver );
          $scope.getCurrentFileUploadElement().on('dragleave', $scope.onFileDragLeave );
          $scope.getCurrentFileUploadElement().on('change', $scope.onChooseFile );
        }

        $scope.onFileDragOver = function(){
          $scope.setViewState( MediaObjectService.states.SELECTED );
        }

        $scope.onFileDragLeave = function(){
          $scope.setViewState( MediaObjectService.states.READY );
        }

        $scope.onChooseFile = function(e){

          if( e.target.files[0]!=undefined ){

            var __media_object = $scope.createMediaObject( e.target.files[0], e.target.files[0] );
            var __uploader = $scope.mediaUploaderFactory.createUploader(  __media_object, $scope.uploaderType );

            $scope.setFileUploadMeta( __media_object, e.target.files[0] );

            $scope.hideCurrentUploader();
            $scope.createNewUploadArea();
            $scope.addFileEventListenersToCurrentUploader();

            if( $scope.onMediaChosen ){
              $scope.onMediaChosen( __media_object );  
            }

            __uploader.onComplete = $scope.onMediaUploaded;
            __uploader.upload();

          }

          $scope.setViewState( MediaObjectService.states.READY );

        }

        $scope.createMediaObject = function( file ){
          return $scope.mediaObjectFactory.createMediaObject( $scope.mediaObjectType, file );
        }

        $scope.getCurrentFileUploadElement = function(){
          return $($element).find('input[type="file"].current');
        }

        $scope.createNewUploadArea = function(){
          var uploader = $('<input type="file" class="current">');
          $element.find('.upload').append(uploader);
          return uploader;
        }

        $scope.hideCurrentUploader = function(){
          $scope.getCurrentFileUploadElement().removeClass('current');
        }

        $scope.setFileUploadMeta = function( media_object, file ){
          MediaObjectService.setFileUploadMeta(media_object,file);
        }

        $scope.setViewState = function( state ){
          if(state==MediaObjectService.states.SELECTED){
            $element.find('.zappi-button').addClass('hover');
          } else {
            $element.find('.zappi-button').removeClass('hover');
          }
        }

        $scope.removeMedia = function(){
          $timeout(function(){
            if( $scope.onMediaRemoved )
              $scope.onMediaRemoved( $scope.mediaObject );
          }, 50 );
        }

        $scope.saveMeta = function( media_object ){
          media_object.saved = true;
        }

        $scope.previewMedia = function( media_object ){
          alert('This should show the media element in a modal window in the page.');
        }

        $scope.editMeta = function( media_object ){
          media_object.saved = false;
        }

        $scope.createNewUploadArea();
        $scope.addFileEventListenersToCurrentUploader();

        if( $scope.mediaUploadState==null || $scope.mediaUploadState==undefined )
          $scope.mediaUploadState = MediaObjectService.states.READY;
        
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_media_upload.html'
    }
  }]);

});