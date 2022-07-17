import { useEffect, useState } from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { Col, Row, Card, Pagination, Spin, Input } from 'antd';
import { Link } from 'react-router-dom';

import debounce from '../../utils/debounce';
import useMst from '../../hooks/useMst';

import './index.css';

const { Search } = Input;

const CharacterList: React.FC = observer(() => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState<string>();

    const {
        charactersStore: { fetchCharacters, characters, count, loading },
    } = useMst();

    useEffect(() => {
        void fetchCharacters({ page });
    }, []);

    const paginationHandler = (page: number) => {
        setPage(page);
        void fetchCharacters({ page, search });
    };

    const searchHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setSearch(search);
        setPage(1);
        void fetchCharacters({ page: 1, search });
    }, 500);

    return (
        <section className="main-content">
            <Search placeholder="searching by name" enterButton className="search-input" onChange={searchHandler} />
            <Spin spinning={loading}>
                <Row className="characters" gutter={24}>
                    {getSnapshot(characters).map(({ id, name, birth_year, height }) => {
                        return (
                            <Col key={id} className="characters-column">
                                <Card
                                    title={name}
                                    className="character"
                                    extra={<Link to={`${id}`}>More</Link>}
                                    style={{ margin: 20 }}
                                >
                                    <strong>Birth year</strong>
                                    <p>{birth_year}</p>
                                    <strong>Height</strong>
                                    <p>{height}</p>
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
                className="characters-pagination"
            />
        </section>
    );
});

export default CharacterList;
