import React from 'react';
import styled from 'styled-components';

//Components:
import BodyBlock from './BodyBlock';
import BodyBlockSpread from './BodyBlockSpread';

//Imgs:
import feature_task_news from '../../Img/feature_task_news.png';
import feature_messenger from '../../Img/feature_messenger.png';
import feature_calendar from '../../Img/feature_calendar.png';
import feature_bionotes from '../../Img/feature_bionotes.png';
import feature_collection from '../../Img/feature_collection.png';
import feature_lacz from '../../Img/feature_lacz.png';
import feature_compare from '../../Img/feature_compare.png';

//Styles:

const StyledBodyBlock = styled.div`
    overflow: hidden;
    text-align: center;
    padding: 20px 20px;
    background-color: #00353d;
    background: linear-gradient(
        180deg,
        rgba(34, 35, 65, 1) 0%,
        rgba(0, 53, 61, 1) 19%
    );
`;
const StyledFeatureHeader = styled.h2`
    margin-top: 30px;
    font-family: 'Ubuntu', 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 50px;
    color: white;
    font-weight: 400;
    margin-bottom: 50px;

    @media only screen and (max-width: 650px) {
        margin-top: 10px;
        font-size: 28px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        margin-top: 10px;
        font-size: 28px;
    }
`;

const StyledLogoHeader = styled.span`
    font-family: 'Pattaya', 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 55px;
    color: white;
    font-weight: 400;

    @media only screen and (max-width: 650px) {
        font-size: 28px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 28px;
    }
`;

//Render:
const MainBodyblock = () => {
    //This MainBodyBlock consists of the reusable component 'BodyBlock' and single component 'BodyBlockSpread'. BodyBlock makes up the bulk of the description on the landing page.
    return (
        <StyledBodyBlock>
            <StyledFeatureHeader>
                What is
                <StyledLogoHeader> Petri </StyledLogoHeader>?
            </StyledFeatureHeader>
            <BodyBlock
                Title="Stay Updated With Your Priorities"
                Description="Petri offers a priority task log that makes sure you stay focused on the primary objectives you want to accomplish today. Additionally, receive an updated, curated list of the top science news in the U.S."
                Img={feature_task_news}
            />
            <BodyBlock
                Title="Collaborate With Peers"
                Description={`Research often entails collaboration between experts to successfully complete an experiment. Bounce ideas around with other experts in your field with Petri's messenger, or 'The Petri Dish'.`}
                Img={feature_messenger}
                Reverse="true"
            />
            <BodyBlock
                Title="Organize Your Schedule"
                Description={`There are not many times research involves a single experiment per day. For optimal efficiency, many experiments overlap and are ran in tandem across many weeks. Completely organize your hectic schedule using Petri's built-in calendar.`}
                Img={feature_calendar}
            />
            <BodyBlock
                Title="Document Your Research"
                Description={`In research, there's something that everyone can agree upon--documentation is important. Never lose your detailed protocols or painfully collected data again with Petri's "bionotes" editor.`}
                Img={feature_bionotes}
                Reverse="true"
            />
            <BodyBlockSpread
                Title="Access Customized Tools"
                Description="Petri offers the ability to request for customized research tools--tailored perfectly to whatever experiment you require."
                firstImg={feature_collection}
                secondImg={feature_lacz}
                thirdImg={feature_compare}
            />
        </StyledBodyBlock>
    );
};

export default MainBodyblock;
