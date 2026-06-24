package com.lumira.saas.infrastructure.persistence.mybatis;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.Map;

class JdbcResultSetSqlRow extends SqlRow {

    private final ResultSet resultSet;

    JdbcResultSetSqlRow(ResultSet resultSet) {
        super(Map.of());
        this.resultSet = resultSet;
    }

    @Override
    public Object getObject(String column) {
        try {
            return resultSet.getObject(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public <T> T getObject(String column, Class<T> requiredType) {
        try {
            return resultSet.getObject(column, requiredType);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public String getString(String column) {
        try {
            return resultSet.getString(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public long getLong(String column) {
        try {
            return resultSet.getLong(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public int getInt(String column) {
        try {
            return resultSet.getInt(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public boolean getBoolean(String column) {
        try {
            return resultSet.getBoolean(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public BigDecimal getBigDecimal(String column) {
        try {
            return resultSet.getBigDecimal(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public Timestamp getTimestamp(String column) {
        try {
            return resultSet.getTimestamp(column);
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public Map<String, Object> asMap() {
        try {
            ResultSetMetaData metaData = resultSet.getMetaData();
            Map<String, Object> values = new LinkedHashMap<>();
            for (int index = 1; index <= metaData.getColumnCount(); index += 1) {
                String label = metaData.getColumnLabel(index);
                values.put(label, resultSet.getObject(index));
            }
            return new SqlRow(values).asMap();
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Override
    public boolean wasNull() {
        try {
            return resultSet.wasNull();
        } catch (SQLException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
