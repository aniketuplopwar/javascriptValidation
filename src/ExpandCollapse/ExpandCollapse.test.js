import React from 'react';
import ExpandCollapse from './index';
import ExpandCollapseHeader from './ExpandCollapseHeader';
import ExpandCollapseBody from './ExpandCollapseBody';
import * as config from  "../enzyme.config.js";
import { shallow, render, mount} from 'enzyme';

describe('Expand Collapse',()=>{

    it('should be defined',()=>{
        expect(ExpandCollapse).toBeDefined();
    });

    xit('should match the snapshot',()=>{
        const wrapper = shallow(
            <ExpandCollapse>
                <ExpandCollapseHeader> header</ExpandCollapseHeader>
                <ExpandCollapseBody> body</ExpandCollapseBody>
            </ExpandCollapse>
            );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the children',()=>{
        const wrapper = shallow(
            <ExpandCollapse>
                <ExpandCollapseHeader>header</ExpandCollapseHeader>
                <ExpandCollapseBody>body</ExpandCollapseBody>
            </ExpandCollapse>
            );
        expect(wrapper.find('ExpandCollapseHeader').length).toEqual(1);
        expect(wrapper.find('ExpandCollapseBody').length).toEqual(1);
    });

    it('should only render the allowed children',()=>{
        const wrapper = shallow(
            <ExpandCollapse>
                <div id="test-1">
                </div>
            </ExpandCollapse>
            );
        expect(wrapper.find('div#test-1').length).toEqual(0);
    });

    it('should add the classes if provided',()=>{
        const wrapper = shallow(
            <ExpandCollapse classes="test-class">
                <ExpandCollapseHeader>header</ExpandCollapseHeader>
                <ExpandCollapseBody>body</ExpandCollapseBody>
            </ExpandCollapse>
            );
        expect(wrapper.find('.test-class').length).toEqual(1);
    });

    it('should propogate the props to children',()=>{
        const wrapper = render(
            <ExpandCollapse>
                <ExpandCollapseHeader classes="test-class">header</ExpandCollapseHeader>
                <ExpandCollapseBody>body</ExpandCollapseBody>
            </ExpandCollapse>
            );
        expect(wrapper.find('.test-class').length).toEqual(1);
    });

    xit('should expand on click of icon if icon is provided',()=>{
        const wrapper = render(
            <ExpandCollapse>
                <ExpandCollapseHeader 
                    classes="test-class">header</ExpandCollapseHeader>
                <ExpandCollapseBody>body</ExpandCollapseBody>
            </ExpandCollapse>
            );
        wrapper.find('.expand-collapse-header-content').simulate('click')    
        expect().toBe(false);
    });
});

describe('Expand collapse Body',()=>{
    it('should render body content',()=>{
        const wrapper = render(
            <ExpandCollapse>
                <ExpandCollapseHeader>
                    header
                </ExpandCollapseHeader>
                <ExpandCollapseBody> <div className="test-class-1"></div></ExpandCollapseBody>
            </ExpandCollapse>
            );
            expect(wrapper.find('.test-class-1').length).toEqual(1);
    });
    
    it('should add the classes if provided to the body',()=>{
        const wrapper = render(
            <ExpandCollapse>
                <ExpandCollapseHeader>header</ExpandCollapseHeader>
                <ExpandCollapseBody classes="test-class"> body</ExpandCollapseBody>
            </ExpandCollapse>
            );
        expect(wrapper.find('.test-class').length).toEqual(1);
    });

    it('should hide the body if isExpand is true',()=>{
        const wrapper = render(
                <div><ExpandCollapseBody classes="test-class"> header</ExpandCollapseBody></div>
            );
        expect(wrapper.find('.hidden').length).toEqual(1);
    });
});


describe('Expand collapse Header',()=>{
    it('should render header content',()=>{
        const wrapper = render(
                <ExpandCollapseHeader>
                    <div className="test-class-1"></div>
                </ExpandCollapseHeader>
            );
            expect(wrapper.find('.test-class-1').length).toEqual(1);
    });
    
    it('should add the classes if provided to the header',()=>{
        const wrapper = render(
                <div><ExpandCollapseHeader classes="test-class">header</ExpandCollapseHeader></div>
            );
        expect(wrapper.find('.test-class').length).toEqual(1);
    });

    it('should render icon only if includeIcon prop is true',()=>{
        const wrapperWithIcon = render(
                <ExpandCollapseHeader classes="test-class" includeIcon={true}>header</ExpandCollapseHeader>
            );
        const wrapperWithoutIcon = render(
                <ExpandCollapseHeader classes="test-class" includeIcon={false}>header</ExpandCollapseHeader>
            );    

        expect(wrapperWithIcon.find('.expand-collapse-icon').length).toEqual(1);
        expect(wrapperWithoutIcon.find('.expand-collapse-icon').length).toEqual(0);
    });

    it('should render expanded icon when isExpanded is true',()=>{
        const wrapperWithExpandedIcon = render(
                <ExpandCollapseHeader classes="test-class" 
                            includeIcon={true}
                            isExpanded={true}
                            expandedIcon={<div className="expandedIcon"></div>}
                            collapsedIcon={<div className="collapsedIcon"></div>}
                >children</ExpandCollapseHeader>
            );  

        expect(wrapperWithExpandedIcon.find('.expandedIcon').length).toEqual(1);
        expect(wrapperWithExpandedIcon.find('.collapsedIcon').length).toEqual(0);
    });

    it('should render collapsed icon when isExpanded is false',()=>{
        const wrapperWithCollapsedIcon = render(
                <ExpandCollapseHeader classes="test-class" 
                            isExpanded={false}
                            includeIcon={true}
                            expandedIcon={<div className="expandedIcon"></div>}
                            collapsedIcon={<div className="collapsedIcon"></div>}
                >children</ExpandCollapseHeader>
            );  

        
        expect(wrapperWithCollapsedIcon.find('.expandedIcon').length).toEqual(0);
        expect(wrapperWithCollapsedIcon.find('.collapsedIcon').length).toEqual(1);
    });

    it('should call onClick prop on click of header when icon is not available', ()=>{
        const handleClick = jest.fn().mockImplementation(()=>{});
        const wrapper = mount(
                <ExpandCollapseHeader classes="test-class" 
                            onClick={handleClick}
                >children</ExpandCollapseHeader>
            ); 
        expect(wrapper.find('.expand-collapse-header-content').length).toEqual(1);
        wrapper.find('.expand-collapse-header-content').simulate('click');
        expect(handleClick).toHaveBeenCalled();    

    });

    it('should call onClick prop on click of icon when icon is available', ()=>{
        const handleClick = jest.fn().mockImplementation(()=>{});
        const wrapper = mount(
                <ExpandCollapseHeader classes="test-class"
                            onClick={handleClick} 
                            includeIcon={true}
                            expandedIcon={<div className="expandedIcon"></div>}
                            collapsedIcon={<div className="collapsedIcon"></div>}
                >children</ExpandCollapseHeader>
            ); 
        expect(wrapper.find('.collapsedIcon').length).toEqual(1);
        wrapper.find('.collapsedIcon').simulate('click');
        expect(handleClick).toHaveBeenCalled();    
    });
});
