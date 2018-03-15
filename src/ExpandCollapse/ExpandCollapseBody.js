import React from 'react';
import PropTypes from 'prop-types';

const ExpandCollapseBody = ({
    classes,
    children,
    isExpanded
})=>{
    const bodyClass = isExpanded ? '' : 'hidden';
    return (
        <div className={`${classes} expand-collapse-body ${bodyClass}`}>
        {children}
        </div>
    );
};

ExpandCollapseBody.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    classes: PropTypes.string,
};

ExpandCollapseBody.defaultProps = {
    classes: ''
}


export default ExpandCollapseBody;