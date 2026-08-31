'use client';

import { useState } from 'react';
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, ConfigProvider, Flex, Form, Input, Space, Tag, Typography, theme } from 'antd';
import Image from 'next/image';
import { getSafeReturnPath } from '@/lib/maintenance-path';
import styles from './maintenance.module.css';

const { Title, Paragraph, Text } = Typography;

type MaintenanceScreenProps = {
  returnPath: string;
};

type AccessFormValues = {
  password: string;
};

export function MaintenanceScreen({ returnPath }: MaintenanceScreenProps) {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit({ password }: AccessFormValues) {
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/maintenance/unlock/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setError(data?.message ?? '验证失败，请稍后重试。');
        setIsSubmitting(false);
        return;
      }

      window.location.replace(getSafeReturnPath(returnPath));
    } catch {
      setError('暂时无法连接服务器，请检查网络后重试。');
      setIsSubmitting(false);
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1756d1',
          colorInfo: '#1756d1',
          colorText: '#0f172a',
          colorTextSecondary: '#64748b',
          colorBorder: '#dbe3ef',
          borderRadius: 12,
          controlHeightLG: 52,
          fontFamily:
            "var(--font-alibaba-puhuiti), 'PingFang SC', 'Microsoft YaHei', ui-sans-serif, system-ui, sans-serif",
        },
        components: {
          Button: {
            fontWeight: 600,
            primaryShadow: '0 12px 28px rgba(23, 86, 209, 0.24)',
          },
          Card: {
            borderRadiusLG: 28,
          },
          Input: {
            activeBorderColor: '#2563eb',
            hoverBorderColor: '#6b8fe0',
            activeShadow: '0 0 0 4px rgba(37, 99, 235, 0.10)',
          },
        },
      }}
    >
      <main className={styles.page}>
        <div className={styles.dotGrid} aria-hidden="true" />
        <div className={styles.glowTop} aria-hidden="true" />
        <div className={styles.glowBottom} aria-hidden="true" />

        <Card className={styles.card}>
          <div className={styles.layout}>
            <section className={styles.brandPanel} aria-labelledby="maintenance-title">
              <div className={styles.ringLarge} aria-hidden="true" />
              <div className={styles.ringSmall} aria-hidden="true" />

              <Flex vertical className={styles.brandContent}>
                <Flex align="center" gap={12}>
                  <span className={styles.logoWrap}>
                    <Image src="/assets/aiadc-logo-small.webp" alt="AIADC 标志" width={48} height={48} priority />
                  </span>
                  <div>
                    <Text className={styles.brandName}>AIADC</Text>
                    <Text className={styles.brandSubtitle}>全国大学生智能应用开发大赛</Text>
                  </div>
                </Flex>

                <div className={styles.brandMessage}>
                  <Tag className={styles.statusTag} icon={<ThunderboltOutlined />}>
                    网站升级维护
                  </Tag>
                  <Title id="maintenance-title" className={styles.heroTitle}>
                    我们正在让体验
                    <br />
                    变得更好
                  </Title>
                  <Paragraph className={styles.heroDescription}>
                    官方网站正在进行内容更新与系统优化。维护期间，已获授权的访问者可通过密码进入网站。
                  </Paragraph>
                </div>

                <Space size={24} wrap className={styles.brandMeta}>
                  <Text>
                    <ClockCircleOutlined /> 服务将尽快恢复
                  </Text>
                  <Text>
                    <SafetyCertificateOutlined /> 安全访问验证
                  </Text>
                </Space>
              </Flex>
            </section>

            <section className={styles.accessPanel} aria-labelledby="access-title">
              <Flex vertical className={styles.accessContent}>
                <span className={styles.securityIcon} aria-hidden="true">
                  <SafetyCertificateOutlined />
                </span>
                <Text className={styles.eyebrow}>AUTHORIZED ACCESS</Text>
                <Title level={2} id="access-title" className={styles.accessTitle}>
                  授权访问
                </Title>
                <Paragraph className={styles.accessDescription}>
                  请输入访问密码。验证成功后，将自动进入您原本访问的页面。
                </Paragraph>

                <Form<AccessFormValues>
                  layout="vertical"
                  requiredMark={false}
                  onFinish={handleSubmit}
                  className={styles.form}
                >
                  <Form.Item
                    label="访问密码"
                    name="password"
                    rules={[{ required: true, whitespace: true, message: '请输入访问密码。' }]}
                  >
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined />}
                      placeholder="请输入访问密码"
                      autoComplete="current-password"
                      autoFocus
                      onChange={() => {
                        if (error) setError('');
                      }}
                    />
                  </Form.Item>

                  {error ? (
                    <Alert className={styles.alert} type="error" showIcon message={error} role="alert" />
                  ) : null}

                  <Form.Item className={styles.submitItem}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                      loading={isSubmitting}
                      iconPosition="end"
                      icon={!isSubmitting ? <ArrowRightOutlined /> : undefined}
                    >
                      {isSubmitting ? '正在验证' : '验证并进入网站'}
                    </Button>
                  </Form.Item>
                </Form>

                <div className={styles.helpText}>
                  <Text type="secondary">
                    如需访问权限，请联系大赛组委会。密码仅用于维护期间的临时访问，请勿转发。
                  </Text>
                </div>
              </Flex>
            </section>
          </div>
        </Card>
      </main>
    </ConfigProvider>
  );
}
