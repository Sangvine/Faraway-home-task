import { useEffect } from 'react';
import { useState } from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { Col, Row, Button, Card, Pagination, Spin, Input } from 'antd';

import useMst from '../../hooks/useMst';

import './index.css';

const { Search } = Input;

const CharacterList: React.FC = observer(() => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const {
        charactersStore: { fetchCharacters, characters, count },
    } = useMst();

    useEffect(() => {
        void fetchCharacters().then(() => setLoading(false));
    }, []);

    const paginationHandler = (page: number) => {
        setLoading(true);
        void fetchCharacters({ page }).then(() => setLoading(false));
        setPage(page);
    };

    const colStyles = {
        flexBasis: '20%',
        width: '20%',
    };

    return (
        <section className="main-content">
            <Search
                placeholder="searching by name"
                enterButton
                style={{ margin: '0px 20px 0px 20px', width: 'unset' }}
            />
            <Spin spinning={loading}>
                <Row className="characters" gutter={24}>
                    {getSnapshot(characters).map(el => {
                        return (
                            <Col key={el.id} style={colStyles}>
                                <Card
                                    title={el.name}
                                    className="character"
                                    extra={<a href="#">More</a>}
                                    style={{ margin: 20 }}
                                >
                                    <strong>Birth year</strong>
                                    <p>{el.birth_year}</p>
                                    <strong>Height</strong>
                                    <p>{el.height}</p>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Spin>
            <Pagination
                total={count || 0}
                current={page}
                onChange={paginationHandler}
                showSizeChanger={false}
                style={{ marginLeft: 20 }}
            />
        </section>
    );
});

export default CharacterList;
