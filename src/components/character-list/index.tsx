import { useEffect } from 'react';
import { useState } from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { Col, Row, Card, Pagination, Spin, Input } from 'antd';

import useMst from '../../hooks/useMst';

import './index.css';
import debounce from '../../utils/debounce';

const { Search } = Input;

const CharacterList: React.FC = observer(() => {
    const [page, setPage] = useState(1);
    const {
        charactersStore: { fetchCharacters, characters, count, loading },
    } = useMst();

    useEffect(() => {
        void fetchCharacters();
    }, []);

    const paginationHandler = (page: number) => {
        void fetchCharacters({ page });
        setPage(page);
    };

    const colStyles = {
        flexBasis: '20%',
        width: '20%',
        minWidth: 200,
    };

    const searchHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        void fetchCharacters({ search: e.target.value });
    }, 500);

    return (
        <section className="main-content">
            <Search
                placeholder="searching by name"
                enterButton
                style={{ margin: '0px 20px 0px 20px', width: 'unset' }}
                onChange={searchHandler}
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
