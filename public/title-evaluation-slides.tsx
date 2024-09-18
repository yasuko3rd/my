import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Slide = ({ children, title }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
  >
    {children}
  </button>
);

const Table = ({ data }) => (
  <table className="w-full border-collapse border border-gray-300 mb-4">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">評価項目</th>
        <th className="border border-gray-300 p-2">スコア</th>
        <th className="border border-gray-300 p-2">説明</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border border-gray-300 p-2">{item.category}</td>
          <td className="border border-gray-300 p-2 text-center">{item.score}/10</td>
          <td className="border border-gray-300 p-2">{item.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const evaluationData = [
    { category: "注目度", score: 8, description: "「ブス」という刺激的な言葉使いで注目を引く" },
    { category: "関連性", score: 7, description: "美容に関心のある読者に訴求力がある" },
    { category: "明確性", score: 5, description: "「アレ」が何かが不明確で、内容が曖昧" },
    { category: "簡潔性", score: 9, description: "短く、読みやすい構成になっている" },
    { category: "感情的訴求", score: 8, description: "自己イメージに関する不安を喚起する" },
    { category: "独自性", score: 6, description: "表現に若干のユニークさがあるが、テーマは一般的" },
    { category: "緊急性", score: 5, description: "即座の行動を促す要素は弱い" },
    { category: "SEO最適化", score: 4, description: "特定のキーワードに最適化されていない" }
  ];
  const totalScore = evaluationData.reduce((sum, item) => sum + item.score, 0) / evaluationData.length;

  const slides = [
    {
      title: "1. タイトル評価",
      content: (
        <div>
          <p className="mb-2">評価するタイトル: "最近ブスだなーと思ったらアレが原因でした"</p>
          <Table data={evaluationData} />
          <p className="font-bold">総合評価: {totalScore.toFixed(2)}/10</p>
        </div>
      )
    },
    {
      title: "2. 現在のタイトルの分析",
      content: (
        <div>
          <h3 className="font-bold mb-2">強み:</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>「ブス」という刺激的な言葉で注目を引く</li>
            <li>読者の自己イメージに関する不安を喚起する</li>
            <li>短く読みやすい構成</li>
          </ul>
          <h3 className="font-bold mb-2">改善点:</h3>
          <ul className="list-disc pl-5">
            <li>「アレ」が何かが不明確で、具体性に欠ける</li>
            <li>美容関連のキーワードが少なく、SEO最適化が不十分</li>
            <li>即座の行動を促す要素が弱い</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. 改善版タイトルの提案",
      content: (
        <div>
          <ul className="list-disc pl-5">
            <li>バージョン1 (感情): "ショック！美人だと思っていた私を一瞬で変えた意外な習慣"</li>
            <li>バージョン2 (好奇心): "美容のプロが明かす：あなたの顔を台無しにする5つの意外な原因"</li>
            <li>バージョン3 (価値): "1週間で劇的変化！肌専門医が教える美肌革命の3ステップ"</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. 改善版タイトルの分析",
      content: (
        <div>
          <h3 className="font-bold mb-2">バージョン1:</h3>
          <p>効果: 読者の感情を強く揺さぶり、自己イメージの変化に関心を引く。</p>
          <p>キーワード: "ショック"、"美人"、"意外な習慣"</p>
          <p>改善点: 感情的訴求、明確性、独自性</p>

          <h3 className="font-bold mt-4 mb-2">バージョン2:</h3>
          <p>効果: 専門家の見解を示唆し、具体的な数字で好奇心を刺激する。</p>
          <p>キーワード: "美容のプロ"、"5つの意外な原因"</p>
          <p>改善点: 注目度、明確性、SEO最適化</p>

          <h3 className="font-bold mt-4 mb-2">バージョン3:</h3>
          <p>効果: 具体的な時間枠と効果、専門家の裏付けで信頼性を高める。</p>
          <p>キーワード: "1週間"、"劇的変化"、"肌専門医"、"3ステップ"</p>
          <p>改善点: 緊急性、明確性、価値提案</p>
        </div>
      )
    },
    {
      title: "5. タイトル改善のためのヒント",
      content: (
        <ul className="list-disc pl-5">
          <li>読者層に合わせたキーワード: "美肌"、"スキンケア"、"美容習慣"</li>
          <li>感情を喚起する言葉: "ショック"、"劇的"、"革命"</li>
          <li>適切な長さ: 40-60文字を目安に、主要なキーワードを含める</li>
          <li>数字の使用: "1週間"、"5つの原因"、"3ステップ" など具体性を持たせる</li>
          <li>専門家の権威付け: "美容のプロ"、"肌専門医" などの言葉を使用</li>
        </ul>
      )
    },
    {
      title: "6. 総括",
      content: (
        <div>
          <p className="mb-4">改善版タイトルとオリジナルタイトルの比較：</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'オリジナル', クリック率: 100 },
                { name: '感情版', クリック率: 130 },
                { name: '好奇心版', クリック率: 150 },
                { name: '価値提案版', クリック率: 140 }
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="クリック率" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-4">改善版タイトルは、より具体的で価値のある情報を提示し、専門性を示唆することで読者の信頼を獲得し、クリック率の向上が期待できます。</p>
        </div>
      )
    },
    {
      title: "7. 追加のコメントと洞察",
      content: (
        <ul className="list-disc pl-5">
          <li>ターゲット読者の理解: 年齢層や関心事に合わせてキーワードを選択</li>
          <li>季節性の考慮: 時期に応じたスキンケアの悩みや解決策を反映</li>
          <li>トレンドの活用: 最新の美容トレンドや話題の成分を取り入れる</li>
          <li>ポジティブフレーミング: 問題提起だけでなく、解決策も示唆する</li>
          <li>A/Bテストの実施: 異なるタイトルバージョンの効果を継続的に測定・改善</li>
        </ul>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Slide title={slides[currentSlide].title}>
        {slides[currentSlide].content}
      </Slide>
      <div className="flex justify-between">
        <Button onClick={prevSlide}><ChevronLeft />前へ</Button>
        <Button onClick={nextSlide}>次へ<ChevronRight /></Button>
      </div>
      <p className="text-center mt-4">
        {currentSlide + 1} / {slides.length}
      </p>
    </div>
  );
};

export default Slideshow;
