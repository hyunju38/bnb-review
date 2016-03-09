import React from 'react';

const DISPLAY_NAME = 'REVIEW_FORM';

const ReviewForm = () => {

    return (
        <div>
            <form action='/reviews'>
                <div className="form-group">
                    <label for="comment">{'Comment'}</label>
                    <input id="comment" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label for="score">{'Score'}</label>
                    <input id="score" type="number" className="form-control"
                        min="1" max="5" />
                </div>
                <button type="submit" className="btn btn-default">
                    {'Submit'}
                </button>
            </form>
        </div>
    );  
};
ReviewForm.displayName = DISPLAY_NAME;

export default ReviewForm;