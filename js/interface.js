document.documentElement.classList.add('provider-' + Fliplet.Env.get('providerMode'));

var $imagesContainer = $('.image-library');
var $fileDropDown = $('#drop-down-file-source');
var $dropZone = $('#drop-zone');
var $fileInput = $('#upload-file');
var $spinnerHolder = $('.spinner-holder');
var $addDropDownMenuBtn = $('#add-drop-down-menu');
var $addMenu = $('#add-menu');
var $progressLine = $('#progress-line');
var $progressBarWrapper = $('#progress-bar-wrapper');
var $cancelUploadButton = $('#cancel-upload');
var $alertWrapper = $('#alert-wrapper');
var $wrongFileWrapper = $('#wrong-file-wrapper');

var data = Fliplet.Widget.getData() || {};

data.type = data.type || '';
data.selectFiles = data.selectFiles || [];

Fliplet.Widget.toggleSaveButton(data.selectFiles.length);

if (!Array.isArray(data.selectFiles)) data.selectFiles = [data.selectFiles];
data.fileExtension = data.fileExtension || [];
data.selectMultiple = data.selectMultiple || false;
data.allowOrganisationFolder = data.allowOrganisationFolder !== false;
if (!(data.selectMultiple && data.selectFiles.length > 1) && !data.selectFiles) data.selectFiles = [data.selectFiles[0]];

if (data.type === 'folder') {
  $('body').addClass('folderOnly');
}

// if file picker called from image component add overflow hidden to remove double scroll bar
if (data.filePickerOpenFromImage) {
  $('html').css('overflow-y', 'hidden');
}

var selectAvailable = typeof data.selectAvailable !== 'undefined' ? data.selectAvailable : true; // Option to disable the selection of files and folders
var templates = {};
var upTo = [];
var apps = [];
var organizations = [];
var folders = [];
var files = [];

var validType = {
  image: {
    mimetype: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/x-tiff',
      'image/tiff',
      'image/svg+xml'
    ]
  },
  document: {
    mimetype: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/x-iwork-keynote-sffkey',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ]
  },
  video: {
    mimetype: [
      'video/quicktime',
      'video/mp4',
      'application/x-troff-msvideo',
      'video/avi',
      'video/msvideo',
      'video/x-msvideo',
      'video/mpeg',
      'video/x-ms-wmv',
      'video/x-flv',
      'video/3gpp',
      'video/webm'
    ]
  },
  audio: {
    mimetype: [
      'audio/mp3',
      'audio/mpeg',
      'audio/x-mpeg',
      'audio/wav',
      'audio/x-wav',
      'audio/flac',
      'audio/mpegurl',
      'audio/mp4',
      'audio/ogg',
      'audio/x-scpls',
      'audio/webm',
      'video/webm',
      'audio/x-m4a',
      'audio/x-m4b'
    ]
  },
  font: {
    mimetype: [
      'font/ttf',
      'application/x-font-ttf',
      'application/octet-stream',
      'application/x-font-truetype',
      'application/x-font-opentype'
    ]
  }
};

var isCancelClicked;
var forceDropDownInit;

['app', 'image', 'document', 'other', 'video', 'audio', 'font', 'folder', 'organization', 'nofiles']
  .forEach(function(tpl) {
    templates[tpl] = Fliplet.Widget.Templates['templates.' + tpl];
  });

var extensionDictionary = {
  'image': [
    'jpg',
    'png',
    'jpeg',
    'gif',
    'tiff',
    'svg'
  ],
  'document': [
    'pdf',
    'doc',
    'docx',
    'keynote',
    'ppx',
    'ppt',
    'pptx',
    'txt',
    'xls',
    'xlsx'

  ],
  'audio': [
    'flac',
    'm3u',
    'm3u8',
    'm4a',
    'm4b',
    'mp3',
    'ogg',
    'opus',
    'pls',
    'wav',
    'webm'
  ],
  'video': [
    'mov',
    'mp4',
    'avi',
    'mpeg',
    'mpg',
    'wmv',
    'flv',
    '3gpp',
    'webm'
  ],
  'font': [
    'ttf'
  ]
};

var opening = {};

$('[data-toggle="tooltip"]').tooltip();
$('#browser-label').text('Browse ' + (data.type === 'folder' ? 'folders' : 'files') + ' in');

var validExtensions = [];
Object.keys(extensionDictionary).forEach(function(key) {
  extensionDictionary[key].forEach(function(ext) {
    validExtensions.push({
      type: key,
      ext: ext
    });
  });
});

function getFilteredType(extension) {
  var fileExtension = _.find(validExtensions, function(valid) {
    return valid.ext === extension;
  });
  extension = extension.toLowerCase();
  var type = ((data.fileExtension.some(function(ext) {
    return extension === ext.toLowerCase();
  }) || !data.fileExtension.length) && fileExtension) ?
    fileExtension.type : 'others';
  return (type === data.type || data.type === '') ? type : 'others';
}

function getExtensionFromFile(file) {
  var extension;

  if (file.contentType) {
    switch (file.contentType.toLowerCase()) {
      case 'image/jpeg':
      case 'image/jpg':
        extension = 'jpg';
        break;
      case 'image/gif':
        extension = 'gif';
        break;
      case 'image/png':
        extension = 'png';
        break;
      default:
        // will attempted to be populated a few lines below
        extension = null;
    }
  }

  extension = extension || file.url.split('.').pop().toLowerCase();

  return extension;
}

function getFileTemplate(file) {
  var extension = getExtensionFromFile(file);

  file.ext = extension;
  var type = getFilteredType(extension);

  var template;
  switch (type) {
    case 'image':
      file.urlSmall = file.thumbnail || Fliplet.Env.get('apiUrl') + 'v1/media/files/' + file.id + '/contents?size=small';
      template = templates.image(file);
      break;
    case 'video':
      template = templates.video(file);
      break;
    case 'audio':
      template = templates.audio(file);
      break;
    case 'others':
      template = templates.other(file);
      break;
    case 'document':
      template = templates.document(file);
      break;
    case 'font':
      template = templates.font(file);
      break;
    default:
      template = templates.image(file);
  }

  return template;
}

function addFile(file) {
  file.fullname = file.url.substring(file.url.lastIndexOf('/') + 1);
  $imagesContainer.append(getFileTemplate(file));
  Fliplet.Widget.autosize();
}

function addFolder(folder) {
  $imagesContainer.append(templates.folder(folder));
  Fliplet.Widget.autosize();
}

function noFiles() {
  $imagesContainer.html(templates.nofiles(data));
  Fliplet.Widget.autosize();
}

// events
$('.image-library')
  .on('click', '.image-holder.file', onFileClick)
  .on('click', '.image-holder.folder', onFolderClick)
  .on('dblclick', '.image-holder.folder', onFolderDbClick)
  .on('click', '.organization-media', onOrganizationCheck);

$('.add-folder-btn')
  .on('click', createFolder);

$('.actionUploadFile')
  .on('click', uploadFile);

$(document)
  .on('click', '.delete-file', function() {
    var fileID = $(this).parents('.item-holder').data('file-id');
    var $elementToDelete = $(this).parents('.item-holder');

    Fliplet.Modal.confirm({
      message: 'Are you sure you want to delete the file?'
    }).then(function(result) {
      if (!result) {
        return;
      }

      Fliplet.Media.Files.delete(fileID).then(function() {
        $elementToDelete.remove();
      });

      _.remove(files, { id: fileID });
    });
  })
  .on('click', '.delete-folder', function() {
    var $elementToDelete = $(this).parents('.item-holder');
    var folderID = $elementToDelete.data('folder-id');

    Fliplet.Modal.confirm({
      message: 'Are you sure you want to delete the folder?'
    }).then(function(result) {
      if (!result) {
        return;
      }

      if ($elementToDelete.hasClass('selected')) {
        Fliplet.Widget.toggleSaveButton(false);
      }

      Fliplet.Media.Folders.delete(folderID).then(function() {
        $elementToDelete.remove();
      });

      _.remove(folders, { id: folderID });
    });
  })
  .on('click', '.browse-files', function(e) {
    e.preventDefault();
    var navStack = {};
    navStack.tempStack = cleanNavStack();
    navStack.upTo = cleanNavStack();
    navStack.upTo.pop(); // Remove last one

    Fliplet.Studio.emit('overlay', {
      name: 'widget',
      options: {
        size: 'large',
        package: 'com.fliplet.file-manager',
        title: 'File Manager',
        classes: 'data-source-overlay',
        data: {
          context: 'overlay',
          appId: Fliplet.Env.get('appId'),
          folder: navStack.tempStack[navStack.tempStack.length - 1],
          navStack: navStack
        }
      }
    });
  });

function sortByName(item1, item2) {
  return byLowerCaseName(item1) > byLowerCaseName(item2);
}


function getApps() {
  return Fliplet.Apps
    .get()
    .then(function(apps) {
      return apps.sort(sortByName).filter(function(app) {
        return !app.legacy;
      });
    });
}

function getOrganizations() {
  return Fliplet.Organizations
    .get()
    .then(function(organizations) {
      return organizations;
    });
}

function openFolder(folderId) {
  $spinnerHolder.removeClass('hidden');
  opening = {
    type: 'folder',
    id: folderId
  };
  return getFolderAndFiles({
    folderId: folderId
  })
    .then(function(response) {
      if (opening.type !== 'folder' || opening.id !== folderId) {
        return;
      }

      renderFolderContent(response);
      updatePaths();
      $spinnerHolder.addClass('hidden');
    });
}

function openApp(appId) {
  $spinnerHolder.removeClass('hidden');
  opening = {
    type: 'app',
    id: appId
  };
  return getFolderAndFiles({
    appId: appId
  })
    .then(function(response) {
      if (opening.type !== 'app' || opening.id !== appId) {
        return;
      }

      renderFolderContent(response);
      updatePaths();
      $spinnerHolder.addClass('hidden');
    });
}

function openOrganization(organizationId) {
  $spinnerHolder.removeClass('hidden');
  opening = {
    type: 'organization',
    id: organizationId
  };
  return getFolderAndFiles({
    organizationId: organizationId
  })
    .then(function(response) {
      if (opening.type !== 'organization' || opening.id !== organizationId) {
        return;
      }

      renderFolderContent(response);
      updatePaths();
      $spinnerHolder.addClass('hidden');
    });
}

function getFolderAndFiles(filter) {
  // Default filter functions
  var filterFiles = function() {
    return true;
  };
  var filterFolders = function() {
    return true;
  };

  if (Object.keys(filter).indexOf('appId') > -1) {
    // Filter functions
    filterFiles = function(file) {
      return !file.mediaFolderId;
    };
    filterFolders = function(folder) {
      return !folder.parentFolderId;
    };
  } else if (Object.keys(filter).indexOf('organizationId') > -1) {
    // Filter functions
    filterFiles = function(file) {
      return !(file.appId || file.mediaFolderId);
    };
    filterFolders = function(folder) {
      return !(folder.appId || folder.parentFolderId);
    };
  }

  function filterResponse(response) {
    // Filter only the files from that request app/org/folder
    var files = response.files.filter(filterFiles);
    var folders = response.folders.filter(filterFolders);

    return Promise.resolve({
      files: files,
      folders: folders
    });
  }

  return Promise.all([
    Fliplet.Media.Folders.get($.extend({}, {
      type: 'folders',
      cdn: data.cdn
    }, filter))
      .then(filterResponse),
    Fliplet.Media.Folders.get($.extend({}, {
      type: data.fileExtension.length > 0 ? data.fileExtension.map(function(type) {
        return type.toLowerCase();
      }).join(',') : data.type,
      cdn: data.cdn
    }, filter))
      .then(filterResponse)
  ]);
}

function renderFolderContent(values) {
  folders = values[0].folders;
  files = values[1].files;
  emitSelected();

  drawContentItems();
}

function unselectAll() {
  files.forEach(function(file) {
    file.selected = false;
    return;
  });

  folders.forEach(function(folder) {
    folder.selected = false;
    return;
  });

  $('.selected').removeClass('selected');
}

function selectFile(id) {
  if (data.type === 'folder') return;
  var file = _.find(files, function(file) {
    return file.id === id;
  });
  if (!file) return;
  if (!extensionClickFilter(file)) return;

  var isSelected = !file.selected;
  if (!data.selectMultiple) unselectAll();
  file.selected = isSelected;

  Fliplet.Widget.toggleSaveButton(isSelected);

  var $el = $('.item-holder[data-file-id=' + id + ']');
  $el[!!file.selected ? 'addClass' : 'removeClass']('selected');
  emitSelected();
}

function selectFolder(id) {
  if (!(data.type === 'folder' || data.type === '')) return;

  var folder = _.find(folders, function(folder) {
    return folder.id === id;
  });
  if (!folder) return;

  var isSelected = !folder.selected;
  if (!data.selectMultiple) unselectAll();
  folder.selected = isSelected;

  Fliplet.Widget.toggleSaveButton(isSelected);

  var $el = $('.item-holder[data-folder-id=' + id + ']');
  $el[!!folder.selected ? 'addClass' : 'removeClass']('selected');

  emitSelected();
}

function selectItems(items) {
  items.forEach(function(item) {
    if (!item.contentType) {
      if (selectAvailable) {
        selectFolder(item.id);
      }
    } else if (item.contentType) {
      if (selectAvailable) {
        selectFile(item.id);
      }
    }
  });
}

function restoreRoot(appId, organizationId) {
  var backItem;

  if (appId && _.find(apps, ['id', appId])) {
    backItem = _.find(apps, ['id', appId]);
    backItem.back = function() {
      return openApp(appId);
    };
    backItem.name = 'Root';
    backItem.type = 'appId';
    initDropDownState('app_' + appId);
  } else if (organizationId && _.find(organizations, ['id', organizationId])) {
    backItem = _.find(organizations, ['id', organizationId]);
    backItem.back = function() {
      return openOrganization(organizationId);
    };
    backItem.name = 'Root';
    backItem.type = 'organizationId';
    initDropDownState('org_' + organizationId);
  } else {
    initDropDownState();
  }

  if (backItem) {
    upTo.unshift(backItem);
  }

  return Promise.resolve();
}

function restoreFolders(id, appId, organizationId) {
  if (!id) {
    return restoreRoot(appId, organizationId);
  }

  return Fliplet.API.request({
    url: 'v1/media/folders/' + id
  })
    .then(function(res) {
      var backItem = res;

      // Store to nav stack
      backItem.back = function() {
        return openFolder(id);
      };
      backItem.type = 'parentId';
      upTo.unshift(backItem);

      return restoreFolders(res.parentId, res.appId, res.organizationId);
    });
}

function restoreFoldersPath(folderId, appId, organizationId) {
  return restoreFolders(folderId, appId, organizationId)
    .then(function() {
      return upTo[upTo.length - 1].back();
    });
}

function restoreWidgetState() {
  var file = data.selectFiles[0];
  var isFile = file.hasOwnProperty('contentType');

  return Fliplet.API.request({
    url: 'v1/media/' + (isFile ? 'files' : 'folders') + '/' + file.id
  }).then(function(res) {
    if (!res.deletedAt) {
      return res;
    }

    return Fliplet.Modal.confirm({
      title: 'Unable to find ' + (isFile ? 'file' : 'folder'),
      message: '<strong>' + res.name + '</strong> has been deleted',
      buttons: {
        confirm: {
          label: 'Restore ' + (isFile ? 'file' : 'folder'),
          className: 'btn-success'
        },
        cancel: {
          label: 'Select another ' + (isFile ? 'file' : 'folder'),
          className: 'btn-default'
        }
      }
    }).then(function(restore) {
      if (!restore) {
        return res;
      }

      return Fliplet.API.request({
        method: 'POST',
        url: 'v1/media/' + (isFile ? 'files' : 'folders') + '/' + res.id + '/restore'
      }).then(function() {
        // File/folder restored
        delete res.deletedAt;
        return res;
      }).catch(function() {
        // Deletion failed, continue restoring widget state
        // This will restore the widget to its default state
        return Promise.resolve(res);
      });
    });
  }).then(function(res) {
    var parentFolderId = isFile ? res.mediaFolderId : res.parentId;
    return restoreFoldersPath(parentFolderId, res.appId, res.organizationId);
  }).then(function() {
    selectItems(data.selectFiles);
    forceDropDownInit = false;
  }).catch(function(error) {
    console.warn(error);
    defaultInitWidgetState();
  });
}

function getSelectedFilesData() {
  return files
    .filter(function(file) {
      return file.selected;
    });
}

function getSelectedFoldersData() {
  return folders
    .filter(function(folder) {
      return folder.selected;
    });
}

//  Get object with selected files/folders data
function getSelectedData() {
  var result = [].concat(getSelectedFoldersData(), getSelectedFilesData());
  return result;
}

//  Send selected items data to parent widget
function emitSelected() {
  Fliplet.Widget.emit('widget-set-info', getSelectedData());
}


function onFolderClick(e) {
  e.preventDefault();
  var $el = $(this);
  var $parent = $el.parents('.item-holder');

  if (selectAvailable) {
    selectFolder($parent.data('folder-id'));
  }
}

function onFolderDbClick(e) {
  e.preventDefault();
  var $el = $(this);
  var $parent = $el.parents('.item-holder');

  var id = $parent.data('folder-id');
  var backItem;

  // Store to nav stack
  backItem = _.find(folders, ['id', id]);
  backItem.back = function() {
    return openFolder(id);
  };
  backItem.type = 'parentId';
  upTo.push(backItem);

  // Open
  openFolder(id);
}

function onFileClick(e) {
  e.preventDefault();
  var $el = $(this);
  var $parent = $el.parents('.item-holder');

  if (selectAvailable) {
    selectFile($parent.data('file-id'));
  }
}

function onOrganizationCheck() {
  var $el = $(this);
  var fileId = $el.parents('.item-holder').data('file-id');
  $el.toggleClass('active');

  var value = $el.hasClass('active');
  Fliplet.API.request({
    method: 'PUT',
    url: 'v1/media/files/' + fileId,
    data: {
      isOrganizationMedia: value
    }
  });
}

function extensionClickFilter(file) {
  var type = getFilteredType(getExtensionFromFile(file));

  if ((!data.type || data.type === type) && type != 'others') {
    return true;
  }

  return false;
}

$('.back-btn').click(function() {
  if (upTo.length === 0) {
    return;
  }

  upTo.pop();
  upTo[upTo.length - 1]
    .back()
    .then(function() {
      updatePaths();
    });
});

function updatePaths() {
  if (upTo.length === 0) {
    // Hide them
    $('.gallery-tool').removeClass('with-tools');
    $('.back-btn').hide();
    $('.helper').hide();

    return;
  }

  // Show them
  $('.gallery-tool').addClass('with-tools');
  $('.helper').show();
  $('.back-btn').show();

  // Parent folder
  if (upTo.length < 2) {
    $('.helper').hide();
    $('.back-btn').hide();
  } else {
    // hide

    $('.up-to').html(upTo[upTo.length - 2].name);
    $('.helper').show();
    $('.back-btn').show();
  }
  $('.helper').html(upTo[upTo.length - 1].name);
}

function initDropDownState(id) {
  $fileDropDown.prop('disabled', false);

  if (id) {
    $fileDropDown.val(id);
    $fileDropDown.trigger('change');
  }
}

function defaultInitWidgetState() {
  forceDropDownInit = false;

  if (_.find(apps, function(app) {
    return app.id === Fliplet.Env.get('appId');
  })) {
    initDropDownState('app_' + Fliplet.Env.get('appId'));
    return;
  }

  if (apps.length) {
    initDropDownState('app_' + apps[0].id);
    return;
  }

  initDropDownState('org_' + organizations[0].id);
}

function initWidgetState() {
  forceDropDownInit = true;

  if (_.isEmpty(data.selectFiles)) {
    defaultInitWidgetState();
    return;
  }

  restoreWidgetState();
}

function renderApp(id) {
  var backItem;

  backItem = _.find(apps, ['id', id]);
  backItem.name = 'Root';
  backItem.back = function() {
    return openApp(id);
  };
  backItem.type = 'appId';
  upTo = [backItem];

  openApp(id);
}

function renderOrganization(id) {
  var backItem;

  backItem = _.find(organizations, ['id', id]);
  backItem.name = 'Root';
  backItem.back = function() {
    return openOrganization(id);
  };
  backItem.type = 'organizationId';
  backItem.id = id;
  upTo = [backItem];

  openOrganization(id);
}

function init() {
  Fliplet.Studio.emit('widget-rendered', {});
  Promise.all([
    getOrganizations(),
    getApps()
  ])
    .then(function(values) {
      var userOrganisations = values[0];
      var userApps = values[1];
      let dropDownHtml = [];
      var thisOrganisation = _.find(userOrganisations, function(org) {
        return org.id === Fliplet.Env.get('organizationId');
      });
      var thisApp = _.find(userApps, function(app) {
        return app.id === Fliplet.Env.get('appId');
      });

      // Organisations
      if (thisOrganisation) {
        if (data.allowOrganisationFolder) {
          dropDownHtml.push('<optgroup label="--- Organisation ---">');
          dropDownHtml.push('<option value="org_' + thisOrganisation.id + '">' + thisOrganisation.name + '</option>');
          dropDownHtml.push('</optgroup>');
        }

        organizations.push({
          id: thisOrganisation.id,
          name: thisOrganisation.name
        });
      }

      // Apps
      if (thisApp) {
        dropDownHtml.push('<optgroup label="--- App ---">');
        dropDownHtml.push('<option value="app_' + thisApp.id + '">' + thisApp.name + '</option>');
        dropDownHtml.push('</optgroup>');
        apps.push({
          id: thisApp.id,
          name: thisApp.name
        });
      }

      $fileDropDown.append(dropDownHtml.join(''));

      $fileDropDown.change(function() {
        if (forceDropDownInit) {
          return;
        }

        // drop down change handler
        var dataAttr = $fileDropDown.val().split('_');
        var type = dataAttr[0];
        var id = parseInt(dataAttr[1], 10);

        switch (type) {
          case 'app':
            renderApp(id);
            break;
          case 'org':
            renderOrganization(id);
            break;
          default:
            console.warn('Invalid selected type: ' + type);
        }
      });

      return Promise.resolve();
    })
    .then(function() {
      initWidgetState();
    });

  Fliplet.Widget.autosize();
}

// Reload content when closing overlay (file manager)
Fliplet.Studio.onMessage(function(event) {
  var data = event.data;

  if (data.event === 'overlay-close' && data.title === 'File Manager') {
    upTo[upTo.length - 1].back();
  }
});

function cleanNavStack() {
  var newUpTo = upTo.slice();
  newUpTo.forEach(function(obj, idx) {
    newUpTo[idx] = _.omit(obj, ['back']);
  });

  return newUpTo;
}

Fliplet.Widget.onSaveRequest(function() {
  var data = _.map(getSelectedData(), function(file) {
    // Remove irrelevant or volatile information before saving
    _.omit(file, [
      'createdAt', 'updatedAt', 'deletedAt', 'appId',
      'masterMediaFolderId', 'parentId', 'organizationId'
    ]);
    return file;
  });

  Fliplet.Widget.save(data).then(function() {
    Fliplet.Widget.complete();
  });
});

function uploadFile() {
  $fileInput.click();
}

function createFolder() {
  Fliplet.Modal.prompt({
    title: 'Please enter a folder name'
  }).then(function(result) {
    if (result === null) {
      return;
    }

    var folderName = result.trim() || 'Untitled folder';
    var config = {
      name: folderName
    };

    if (upTo.length && upTo[0].type) {
      config[upTo[0].type] = upTo[0].id;
    }

    if (upTo.length > 1) {
      var item = upTo[upTo.length - 1];
      config[item.type] = item.id;
    }

    Fliplet.Media.Folders.create(config)
      .then(function(folder) {
        attachFolder(folder);
      });
  });
}

function attachFolder(folder) {
  addFolderToFolders(folder);
}

function showDropZone() {
  $dropZone.addClass('active');
}

$fileInput.on('click', function(e) {
  e.stopPropagation();
});

$fileInput.on('change', function(e) {
  var files = e.target.files;
  if (!files.length) return;

  data.autoSelectOnUpload = files.length === 1;

  uploadFiles(files);
  clearFileInput();
});

function clearFileInput() {
  $fileInput.wrap('<form>').closest('form').get(0).reset();
  $fileInput.unwrap();
}

function hideDropZone() {
  $dropZone.removeClass('active');
}


function handleCancel(obj) {
  if (!isCancelClicked) return;
  obj.abort();
}

function uploadFiles(files) {
  var confirmedType;
  var confirmedExt;
  var formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    var fileName = files[i].name;
    var dotIndex = fileName.lastIndexOf('.');
    var extension = fileName.substring(dotIndex).toLowerCase();

    confirmedType = _.find(validType[data.type].mimetype, function(type) {
      return type === files[i].type;
    });

    if (!confirmedType) {
      confirmedExt = _.find(extensionDictionary[data.type], function(ext) {
        return '.' + ext === extension;
      });

      if (!confirmedExt) {
        handleUploadingWrongFile();
        break;
      }
    } else if (data.fileExtension.length) {
      var isFileExtensionApproved = data.fileExtension.some(function(ext) {
        return extension === '.' + ext.toLowerCase();
      });
      /**
       * if type was found in our valid types and fileExtension configuration was passed
       * check if the file is from the correct fileExtension
       */
      if (!isFileExtensionApproved) {
        handleUploadingWrongFile();
        break;
      }
    }

    formData.append('' + i, files[i]);
  }

  if (!confirmedType && !confirmedExt) {
    return;
  }

  var config = {
    data: formData,
    progress: function(perсent) {
      handleCancel(this);
      moveProgressBar(perсent);
    }
  };

  if (upTo.length && upTo[0].type) {
    config[upTo[0].type] = upTo[0].id;
  }
  if (upTo.length > 1) {
    var item = upTo[upTo.length - 1];
    config.folderId = item.id;
  }
  isCancelClicked = false;
  hideDropZone();
  showProgressBar();

  Fliplet.Media.Files.upload(config)
    .then(function(files) {
      if (files.length) {
        addFilesToCurrentFiles(files);
      }
      if (data.autoSelectOnUpload) {
        files.forEach(function(file) {
          if (selectAvailable) {
            selectFile(file.id);
          }
        });
      }
      hideProgressBar();
    })
    .then(function() {}, handleUploadingError);
}

function handleUploadingError() {
  hideProgressBar();
  if (isCancelClicked) return;
  showError();
}

function showError() {
  $alertWrapper.show();
  setTimeout(function() {
    $alertWrapper.hide();
  }, 3000);
}

function handleUploadingWrongFile() {
  hideProgressBar();
  if (isCancelClicked) return;
  showWrongFileError();
}

function showWrongFileError() {
  var supportedExtensions = data.fileExtension.length
    ? data.fileExtension.join(', ').toUpperCase()
    : extensionDictionary[data.type].join(', ').toUpperCase();

  if (extensionDictionary[data.type].length === 1) {
    $wrongFileWrapper.find('.supported-file-types').html('Please upload a <strong>' + supportedExtensions + '</strong> file.');
  } else if (extensionDictionary[data.type].length > 1) {
    $wrongFileWrapper.find('.supported-file-types').html('Please upload one of the following files: <strong>' + supportedExtensions + '</strong>.');
  } else {
    $wrongFileWrapper.find('.supported-file-types').html('Please try again.');
  }

  $wrongFileWrapper.show();
  setTimeout(function() {
    $wrongFileWrapper.hide();
  }, 5000);
}

function addFilesToCurrentFiles(newFiles) {
  files = files.concat(newFiles);
  drawContentItems();
}

function addFolderToFolders(folder) {
  folders.push(folder);
  drawContentItems();
}

function byLowerCaseName(item) {
  return item.name.toLowerCase();
}

function drawContentItems() {
  if (!folders.length && !files.length) {
    return noFiles();
  }

  $imagesContainer.empty();
  _.sortBy(folders, byLowerCaseName).forEach(addFolder);
  _.sortBy(files, byLowerCaseName).forEach(addFile);

  Fliplet.Widget.autosize();
}


$dropZone.on('drop', function(e) {
  e.preventDefault();
  hideDropZone();
  var dataTransfer = e.originalEvent.dataTransfer;
  var files = dataTransfer.files;
  if (!files.length) return hideDropZone();
  uploadFiles(files);
});

$dropZone.on('dragover', function(e) {
  e.preventDefault();
});

$dropZone.on('dragleave', function(e) {
  e.preventDefault();
  hideDropZone();
});

$('html').on('dragenter', function(e) {
  e.preventDefault();
  showDropZone();
});

$addDropDownMenuBtn.on('click', function(e) {
  e.preventDefault();
  $addMenu.toggle();
});

$addDropDownMenuBtn.on('blur', function() {
  setTimeout(function() {
    $addMenu.hide();
  }, 200);
});

function showProgressBar() {
  $progressBarWrapper.show();
  moveProgressBar(1);
}

function hideProgressBar() {
  $progressBarWrapper.hide();
}

function moveProgressBar(to) {
  $progressLine.width(to + '%');
}

$cancelUploadButton.on('click', function(e) {
  e.preventDefault();
  isCancelClicked = true;
});

// init
init();
