import React from 'react';
import { connect } from 'react-redux';
import { getNews } from '../../../redux/sciNews/sciNewsActions';
import { AiOutlineReload } from 'react-icons/ai';
import styled from 'styled-components';
import SciCarousel from './SciCarousel';

//Styles:
import { StyledHeader } from './MDTodo';
import { MainTodoContainer } from './MDTodo';
import { RefreshCircle } from '@styled-icons/ionicons-sharp/RefreshCircle';

const MainSciNewsContainer = styled(MainTodoContainer)`
    padding-top: 30px;
    background-color: white;
    height: 400px;
`

const StyledRefresh = styled(RefreshCircle)`
    height: 25px;
    width: 25px;
    color: white;
    margin-bottom: 2px;

`

const StyledButton = styled.button`
    float: right;
    border: none;
    border-radius: 4px;
    background-color: #036bdc;
    cursor: pointer;
`


//Components:

//Render:

const MDSciNews = ({ getNews, news }) => {

    const handleGetRequest = e => {
        e.preventDefault();
        getNews();
    }

    return (
        <>
            <div>
                <StyledHeader>Sci-News Top Headlines
                    <StyledButton onClick={handleGetRequest}>
                        <StyledRefresh />
                    </StyledButton>
                </StyledHeader>
            </div>
            <MainSciNewsContainer>
                <div>
                    <SciCarousel />
                </div>
            </MainSciNewsContainer>
        </>
    )
}

const mapStateToProps = state => {
    return {
        news: state.news,
    }
}

export default connect(mapStateToProps, { getNews })(MDSciNews);