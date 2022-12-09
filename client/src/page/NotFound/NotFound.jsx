import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './404.scss';
import { faHome } from '@fortawesome/free-solid-svg-icons';
function NotFound() {
    return (
        <div className="not_fount-wrap">
            <div className="not_found">
                <h2>404</h2>
                <div class="info">
                    <p>Xin lỗi liên kết không tồn tại</p>
                    <FontAwesomeIcon className="icons" icon={faHome} />
                    <Link to="/">Quay lại</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
