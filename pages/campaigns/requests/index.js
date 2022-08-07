import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../Components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../Components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();


        //Array(requestsCount).fill()，為使用Array建構子建立requestsCount值長度的陣列，並將所有元素初始化為undefined
        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return { address, requests, requestsCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={ index }
                id={ index }
                request={ request }
                address={ this.props.address }
                approversCount={ this.props.approversCount }
            />
        });
    }

    render() {
         //ES2015 語法糖，直接將所有table標籤的屬性作為變數提取。
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        { this.renderRows() }
                    </Body>
                </Table>
                <div>Found { this.props.requestsCount } requests.</div>
            </Layout>            
        );
    }
}

export default RequestIndex;