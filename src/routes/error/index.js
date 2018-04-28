import React from 'react'
import {Exception,Page} from '../../components/index';

export default class Error extends React.Component{
    render(){
        return(
            <Page inner>
                <Exception type="404" />
            </Page>
        );
    }
}

