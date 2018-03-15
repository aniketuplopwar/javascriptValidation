import React from 'react';
import PropTypes from 'prop-types';
import ExpandCollapseHeader from './ExpandCollapseHeader';
import ExpandCollapseBody from './ExpandCollapseBody';


export default class ExpandCollapse extends React.Component {


    constructor(){
        super();
        this.state = this.getDefaultState();
        this.handleClick = this.handleClick.bind(this);
    }

    getDefaultState(){
        return {
            isExpanded: false,
            isTouched: false
        };
    }

    handleClick(){
        this.setState({
            isTouched: true,
            isExpanded: !this.state.isExpanded
        })
    }

    cloneElement(component, additionalProps){

        return React.cloneElement(component, {
            ...component.props,
            ...additionalProps
        })
    }

    prepareHeader(header, isExpanded){
        return this.cloneElement(header, {
            onClick: this.handleClick,
            isExpanded: isExpanded
        })
    }

    prepareBody(body, isExpanded){
        return this.cloneElement(body, {
            isExpanded: this.state.isExpanded
        })
    }

    shouldExpand(isExpandedReceviedFromProp){
        isExpandedReceviedFromProp = isExpandedReceviedFromProp ? isExpandedReceviedFromProp : false;
        return this.state.isTouched ? this.state.isExpanded : isExpandedReceviedFromProp;
    }

    prepareChildren(children, isExpanded){
        let childElements = {};
        const ALLOWED_CHILDREN = [
            ExpandCollapseHeader, 
            ExpandCollapseBody
        ]
        React.Children.forEach(children, (child)=>{
            if(ALLOWED_CHILDREN.indexOf(child.type) > -1){
                switch(child.type) {
                    case ExpandCollapseHeader:
                        childElements.header = this.prepareHeader(child, isExpanded);
                        break;
                    case ExpandCollapseBody:
                        childElements.body = this.prepareBody(child, isExpanded);
                        break;
                    default:
                        break;
                }
            }
        })

        return childElements;
    }
    
    render(){
        const isExpanded = this.shouldExpand(this.props.isExpanded);
        const {header,body} = this.prepareChildren(this.props.children, isExpanded);
        return (
            <div className={`${this.props.classes} expand-collapse`}>
                {header}
                {body}
            </div>
        )
    }


}

ExpandCollapse.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.string
};

ExpandCollapse.defaultProps = {
    classes: ''
}

