import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import CustomMarkdown from './CustomMarkdown';
import { uploadFile, fetchFileFromUrl } from '../HubDetail/Actions';
import { filestoreUrl } from '../../Endpoints';
import TextareaAutosize from 'react-autosize-textarea';

class EditMarkdown extends React.Component {
  constructor(props) {
    super(props);

    const idSalt = Math.random().toString(36).substring(2);

    this.state = { idSalt, viewType: 'preview', dragOver: false, uploadingFiles: [], currNewCursorPos: null };
  }

  componentDidUpdate(prevProps, prevState) {
    const { newCursorPos, idSalt } = this.state;

    if (newCursorPos !== prevState.newCursorPos) {
      const textarea = document.getElementById('currMarkdown_' + idSalt);
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }
  }

  handleEditClick() {
    this.setState({ viewType: 'edit' });
  }

  handlePreviewClick() {
    this.setState({ viewType: 'preview' });
  }

  handleTextEdit(e) {
    const { dispatch, editDispatchFunc } = this.props;

    dispatch(
      editDispatchFunc(e.target.value)
    );
  }

  handleFileDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ dragOver: true });
  }

  handleFileDragLeave() {
    this.setState({ dragOver: false });
  }

  handleFileDrop(e) {
    const { allowFilesUpload } = this.props;

    e.stopPropagation();
    e.preventDefault();

    this.setState({ dragOver: false });

    if (allowFilesUpload) {
      const files = e.dataTransfer.files;

      this.updateMarkdownWithFiles(e.target, files);
    }
  }

  handleFileSelect(e) {
    const { allowFilesUpload } = this.props;
    const { idSalt } = this.state;

    if (allowFilesUpload) {
      const files = e.target.files;
      const textElement = document.getElementById('currMarkdown_' + idSalt);

      this.updateMarkdownWithFiles(textElement, files);
    }
  }

  handleFileFetch(e) {
    const { dispatch, editDispatchFunc } = this.props;
    const { idSalt } = this.state;

    e.stopPropagation();
    e.preventDefault();

    const fileUrl = document.getElementById('fetchFile_' + idSalt).value;

    if (fileUrl) {
      dispatch(fetchFileFromUrl(fileUrl))
        .then((response) => {
          dispatch(
            editDispatchFunc(response)
          );
        })
        .catch((error) => {
          alert('File fetch failed!' + (error.message ? '\nError: "' + error.message + '"' : ''));
        });
    }
  }

  updateMarkdownWithFiles(element, files) {
    const { dispatch, editDispatchFunc } = this.props;

    const updateMarkdownState = (markdownText, file) => {
      const { uploadingFiles } = this.state;
      const currMarkdown = element.value;
      const cursorPos = element.selectionEnd;

      const newCursorPos = cursorPos + markdownText.length;

      dispatch(
        editDispatchFunc(currMarkdown.substring(0, cursorPos) + markdownText + currMarkdown.substring(cursorPos))
      );

      this.setState({
        uploadingFiles: uploadingFiles.slice(0, uploadingFiles.indexOf(file.name)).concat(uploadingFiles.slice(uploadingFiles.indexOf(file.name) + 1)),
        newCursorPos: newCursorPos
      });
    };

    const getOnLoadEndFn = (file) => {
      return () => {
        const { uploadingFiles: uploadingFilesCurr } = this.state;
        this.setState({ uploadingFiles: uploadingFilesCurr.concat([file.name]) });

        dispatch(uploadFile(file))
          .then((response) => {
            const markdownText = ' ' + '![' + file.name + '](' + `${filestoreUrl}/${response.file_id}` + ')';
            updateMarkdownState(markdownText, file);
          })
          .catch((error) => {
            alert('File upload failed.' + (error.message ? '\nError: "' + error.message + '"' : ''));

            const markdownText = ' ' + '![' + file.name + '](error)';
            updateMarkdownState(markdownText, file);
          });
      };
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onloadend = getOnLoadEndFn(file);
      reader.readAsDataURL(file);
    }
  }

  render() {
    const { title, collapsible, markdown, fallbackMarkdown, allowFilesUpload, allowFileFetch, fileFetchUrl } = this.props;
    const { idSalt, viewType, dragOver, uploadingFiles } = this.state;

    const styles = require('./CustomMarkdown.scss');

    const markdownIcon = (
      <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" className={styles.markdown_icon} aria-hidden="true">
        <path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"/>
      </svg>
    );

    const markdownSupportMsg = (
      <a className={styles.markdown_ref_link} target="_blank" href="https://guides.github.com/features/mastering-markdown/">
        Style using &nbsp;{markdownIcon}&nbsp; Markdown.
      </a>
    );

    let uploadFileHint = '';
    if (allowFilesUpload) {
      uploadFileHint = (
        <span className={styles.add_mar_left}>
          To insert files, drag & drop or <label htmlFor={'fileUploadHint_' + idSalt} className={styles.cursorPointer + ' ' + styles.remove_mar_bottom}>select them here</label><input type="file" multiple id={'fileUploadHint_' + idSalt} style={{display: 'none'}} onChange={this.handleFileSelect.bind(this)}/>.
        </span>
      );
    }

    const uploadingMsg = (
      <span className={styles.add_mar_left}>
        { uploadingFiles.length > 0 ? ' [Uploading: ' + uploadingFiles.join(', ') + '...]' : '' }
      </span>
    );

    const ifEnterFetchFile = (e) => {
      if (e.keyCode === 13) {
        this.handleFileFetch(e);
      }
    };

    let fetchFileInput = '';
    if (allowFileFetch) {
      fetchFileInput = (
        <span className={styles.add_mar_left}>
          <input id={'fetchFile_' + idSalt} type="text" defaultValue={fileFetchUrl} placeholder={'Enter file url'} onKeyDown={ifEnterFetchFile}/>
          <label htmlFor={'fetchFile_' + idSalt} className={styles.cursorPointer + ' ' + styles.remove_mar_bottom} onClick={this.handleFileFetch.bind(this)}>
            &nbsp;&nbsp;Fetch content
          </label>
        </span>
      );
    }

    let markdownView;
    let editButtonClassName = styles.tab_btn;
    let previewButtonClassName = styles.tab_btn;

    if (viewType === 'edit') {
      editButtonClassName += ' ' + styles.active_btn + ' ' + styles.active_edit_btn;

      markdownView = (
        <div className={styles}>
          <TextareaAutosize id={'currMarkdown_' + idSalt} className={styles.textarea + (dragOver ? ' ' + styles.drag_over : '')} value={markdown || ''} onChange={this.handleTextEdit.bind(this)} onDrop={this.handleFileDrop.bind(this)} onDragOver={this.handleFileDragOver.bind(this)} onDragLeave={this.handleFileDragLeave.bind(this)}/>
          <div className={styles.textarea_subtext}>
            { markdownSupportMsg }
            { uploadFileHint }
            { uploadingMsg }
            { fetchFileInput }
          </div>
        </div>
      );
    } else if (viewType === 'preview') {
      previewButtonClassName += ' ' + styles.active_btn + ' ' + styles.active_preview_btn;

      markdownView = (
        <div className={styles.preview_content}>
          <CustomMarkdown title={title} markdown={markdown || fallbackMarkdown} collapsible={collapsible} />
        </div>
      );
    }

    return (
      <div className={styles.edit_wrapper}>
        <div>
          <button className={editButtonClassName} onClick={this.handleEditClick.bind(this)}>Edit</button>
          <button className={previewButtonClassName} onClick={this.handlePreviewClick.bind(this)}>Preview</button>
        </div>
        <div className={styles.edit_markdown_wrapper}>
          { markdownView }
        </div>
      </div>
    );
  }
}

EditMarkdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editDispatchFunc: PropTypes.func.isRequired,
  markdown: PropTypes.string.isRequired,
  fallbackMarkdown: PropTypes.string.isRequired,
  title: PropTypes.string,
  collapsible: PropTypes.bool,
  allowFilesUpload: PropTypes.bool,
  allowFileFetch: PropTypes.bool,
  fileFetchUrl: PropTypes.string
};
export default connect()(EditMarkdown);
