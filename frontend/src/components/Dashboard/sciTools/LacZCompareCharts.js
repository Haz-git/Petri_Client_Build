import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

//Styles:
import Fade from 'react-reveal/Fade';
import { Button } from 'react-bootstrap';
import { ArrowLeftSquare } from '@styled-icons/bootstrap/ArrowLeftSquare';

const MainContainer = styled.div`
    margin: 35px 35px;
    background-color: white;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 10px;
    text-align: center;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 5px rgba(0, 0, 0, 0.06),
        0 22.3px 10px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 80px rgba(0, 0, 0, 0.12);
    ;
`

const MainHeader = styled.h1`
    margin: 0;
    font-weight: 900;
    font-size: 50px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
    color: #242746;
    font-family: 'Montserrat', sans-serif;
`

const ChartContainer = styled.div`
    width: 100%;
    height: 600px;
    margin-top: 20px;
    margin-bottom: 40px;
`

const ArrowIcon = styled(ArrowLeftSquare)`
    height: 21px;
    width: 21px;
    margin-right: 7px;
    vertical-align: sub;
`


//Render:
const LacZCompareCharts = ({ laczAssayProtocols, match:{params:{id}} }) => {

    const ownProtocol = laczAssayProtocols.find(x => x.protocolId === id);

    let comparisonData;
    let comparisonArray = [];


    if (ownProtocol.collectionStrains !== null && ownProtocol.collectionStrains !== undefined) {
        comparisonData = {...ownProtocol};
    }

    console.log(comparisonData);

    if (comparisonData !== null && comparisonData !== undefined) {
        for(let k = 0; k < comparisonData.collectionStrains.length; k++) {
            let comparisonObject = {
                name: comparisonData.collectionStrains[k].strainName,
                bgalAverage: comparisonData.collectionStrains[k].bgalData.bgalSlope,
            }

            comparisonArray.push(comparisonObject);
        }
    }

    console.log(comparisonArray);



    return (
        <>
            <Fade>
                <MainContainer>
                    <MainHeader>Your Activities</MainHeader>
                    <ChartContainer>
                        <ResponsiveContainer>
                            <BarChart width={730} height={250} data={comparisonArray} margin={{ top: 0, right: 20, left: 30, bottom: 40 }}>
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis dataKey="name">
                                    <Label value='Strains' position='bottom' style={{ textAnchor: 'middle' }} />
                                </XAxis>
                                <YAxis>
                                    <Label value='B-Galactosidase Activity' position='left' angle={-90} style={{ textAnchor: 'middle' }} />
                                </YAxis>
                                <Tooltip />
                                <Legend verticalAlign="top" height={40}/>
                                <Bar dataKey="bgalAverage" fill="#242746" barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                        <Link to={`/scitools/lazylacz/lacz/${id}`}>
                            <Button variant='dark'>
                                <ArrowIcon />
                                My LacZ Data
                            </Button>
                        </Link>
                </MainContainer>
            </Fade>
        </>
    )
}

const mapStateToProps = state => {
    return {
        laczAssayProtocols: state.laczAssayProtocols.laczProtocol,
    }
}

export default connect(mapStateToProps)(LacZCompareCharts);
