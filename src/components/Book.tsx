import React from 'react';
import styles from './Book.module.css';
import { BookResType } from '../types';
import { BookOutlined, HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface BookProps extends BookResType {
  goEdit: (bookId: number) => void;
  deleteBook: (bookId: number) => void;
}

function formatDate(dateVal: string) {
  const newDate = new Date(dateVal);
  const sMonth = padValue(newDate.getMonth() + 1);
  const sDay = padValue(newDate.getDate());
  const sYear = newDate.getFullYear();
  let sHour: (string | number) = newDate.getHours();
  const sMinute = padValue(newDate.getMinutes());
  let sAMPM = "AM";
  const sAMPMHour = sHour;

  if (sAMPMHour > 12) {
    sAMPM = "PM";
    sHour = sAMPMHour - 12;
  }
  else if (sAMPMHour === 0) {
    sHour = 12;
  }

  sHour = padValue(sHour);
  return `${sMonth}-${sDay}-${sYear} ${sHour}:${sMinute} ${sAMPM}`;
}

function padValue(value: number) {
  return (value < 10) ? "0" + value : value;
}

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
// [project] BookResType 의 응답 값을 이용하여, Book 컴포넌트를 완성했다.
const Book: React.FC<BookProps> = ({ deleteBook, goEdit, bookId, title, author, url, createdAt }) => {
  return (
    <div className={styles.book}>
      <div className={styles.title}>
        <a href={`/book/${bookId}`} className={styles.link_detail_title}>
          <BookOutlined />
          {title}
        </a>
      </div>
      <div className={styles.author}>
        <a href={`/book/${bookId}`} className={styles.link_detail_author}>
          {author}
        </a>
      </div>
      <div className={styles.created}>{formatDate(createdAt)}</div>
      <div className={styles.tooltips}>
        <Tooltip title={url}>
          <a href={url} className={styles.link_url} target="_blank" rel="noopener noreferrer">
            <button type="button" className={`${styles.button_url} ant-btn ant-btn-primary ant-btn-circle ant-btn-sm ant-btn-icon-only`}>
              <HomeOutlined />
            </button>
          </a>
        </Tooltip>
        <Tooltip title="edit">
          <button
            className={`${styles.button_edit} ant-btn ant-btn-circle ant-btn-sm ant-btn-icon-only`}
            onClick={() => goEdit(bookId)}
          >
            <EditOutlined />
          </button>
        </Tooltip>
        <Tooltip title="delete">
          <button
            className={`ant-btn ant-btn-primary ant-btn-circle ant-btn-sm ant-btn-icon-only ant-btn-dangerous`}
            onClick={() => deleteBook(bookId)}
          >
            <DeleteOutlined />
          </button>
        </Tooltip>
      </div>
    </div>);
};

export default Book;
