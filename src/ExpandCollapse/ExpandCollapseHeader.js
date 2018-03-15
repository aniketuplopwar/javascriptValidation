import React from 'react';
import PropTypes from 'prop-types';

const ExpandCollapseHeader = ({
    children,
    classes,
    clickableHeader,
    collapsedIcon,
    expandedIcon,
    onClick,
    includeIcon,
    isExpanded
})=>{
    const headerWithoutIcon = (<div className="expand-collapse-header-content" onClick={onClick}>{children}</div>);
    const headerWithIcon = (
                            <div className="row expand-collapse-header-content">
                                <div className="col-xs-10">
                                    {children}
                                </div>
                                <div className="col-xs-2 expand-collapse-icon">
                                    {isExpanded ? cloneElement(expandedIcon, {onClick: onClick}) : cloneElement(collapsedIcon, {onClick: onClick})}
                                </div>
                            </div>
                            );
    const headerContent = includeIcon ? headerWithIcon :  headerWithoutIcon; 

    return (<div className={`${classes} expand-collapse-header`}>{headerContent}</div>);
};

ExpandCollapseHeader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    classes: PropTypes.string,
    collapsedIcon:PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    expandedIcon:PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
    includeIcon: PropTypes.bool,
    isExpanded: PropTypes.bool
}

ExpandCollapseHeader.defaultProps = {
    classes: '',
    includeIcon: false,
    collapsedIcon: '',
    expandedIcon: '',
    isExpanded: false
}

const cloneElement = (component, additionalProps)=>{
    if(typeof component.props !== 'undefined'){
        return React.cloneElement(component, {
            ...component.props,
            ...additionalProps
        });
    }
    return component;
}


export default ExpandCollapseHeader;