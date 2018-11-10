            <TableWithSearchBar
                noSearch = {true}
                ifAutoHeight={false}
                queryList={this.queryList}
                columns = {this.columns}
                dataSource = {dataSource}
                total={20}
                pageSize={10}
                scroll={{ x: 600, y:300}}
            />