import React, { useState } from 'react';
import { Activity, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const questions = [
  { text: "仕事の締め切りが迫っています。どうしますか？", options: [
    { text: "徹夜してでも終わらせる", stress: 15 },
    { text: "できる範囲で進め、上司に相談する", stress: 5 },
    { text: "同僚に協力を求める", stress: 0 }
  ]},
  { text: "友人から女子会に誘われました。どうしますか？", options: [
    { text: "断る", stress: 5 },
    { text: "短時間だけ参加する", stress: 0 },
    { text: "朝まで盛り上がる", stress: 10 }
  ]},
  { text: "休日の過ごし方は？", options: [
    { text: "家でゆっくりする", stress: -5 },
    { text: "ショッピングに出かける", stress: 0 },
    { text: "溜まった家事をこなす", stress: 10 }
  ]},
  { text: "気分が落ち込んでいます。どうしますか？", options: [
    { text: "友人とおしゃべりする", stress: -5 },
    { text: "エステに行く", stress: -10 },
    { text: "我慢して普段通り過ごす", stress: 10 }
  ]},
  { text: "新しいプロジェクトが始まります。どう取り組みますか？", options: [
    { text: "リーダーシップを取って積極的に進める", stress: 10 },
    { text: "チームメンバーと協力しながら進める", stress: 0 },
    { text: "できるだけ目立たないようにする", stress: 5 }
  ]},
  { text: "体重が増えてきました。どうしますか？", options: [
    { text: "厳しいダイエットを始める", stress: 15 },
    { text: "適度な運動を始める", stress: -5 },
    { text: "気にせず好きなものを食べる", stress: 5 }
  ]},
  { text: "恋愛関係でトラブルが起きました。どうしますか？", options: [
    { text: "一人で悩む", stress: 15 },
    { text: "友人に相談する", stress: -5 },
    { text: "相手と話し合う", stress: 5 }
  ]},
  { text: "職場で意見の対立がありました。どう対処しますか？", options: [
    { text: "自分の意見を強く主張する", stress: 10 },
    { text: "妥協点を探る", stress: 0 },
    { text: "相手の意見に従う", stress: 5 }
  ]},
  { text: "久しぶりの同窓会に誘われました。どうしますか？", options: [
    { text: "張り切って参加する", stress: 5 },
    { text: "気軽な気持ちで参加する", stress: 0 },
    { text: "欠席する", stress: -5 }
  ]},
  { text: "長期の休暇が取れそうです。どう過ごしますか？", options: [
    { text: "海外旅行に行く", stress: -10 },
    { text: "自宅でゆっくり過ごす", stress: -5 },
    { text: "資格取得のために勉強する", stress: 10 }
  ]}
];

const characterEmojis = {
  relaxed: "😌🧘‍♀️",
  balanced: "😊🏃‍♀️",
  busy: "🤔💼",
  stressed: "😓📊",
  fighter: "💪😤"
};

const StressSimulator = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [stress, setStress] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const handleStartGame = () => {
    if (playerName.trim() !== '') {
      setGameStarted(true);
    }
  };

  const handleAnswer = (option) => {
    setStress(prev => Math.max(0, Math.min(100, prev + option.stress)));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    setPlayerName('');
    setStress(50);
    setCurrentQuestion(0);
    setGameEnded(false);
    setGameStarted(false);
  };

  const getStressLevel = () => {
    if (stress < 30) return "リラックス";
    if (stress < 70) return "普通";
    return "ストレスフル";
  };

  const getStressCharacter = () => {
    if (stress < 30) return { name: "ゆるふわライフマスター", emoji: characterEmojis.relaxed };
    if (stress < 50) return { name: "颯爽としたトレンドセッター", emoji: characterEmojis.balanced };
    if (stress < 70) return { name: "忙しいけど頑張るマルチタスカー", emoji: characterEmojis.busy };
    if (stress < 90) return { name: "燃え尽き寸前のスーパーウーマン", emoji: characterEmojis.stressed };
    return { name: "ストレスと闘うメンタルファイター", emoji: characterEmojis.fighter };
  };

  const getAdvice = () => {
    if (stress < 30) return "素晴らしいバランス感覚ですね。周りにも良い影響を与えているはず。たまには自分へのご褒美も忘れずに！";
    if (stress < 70) return "良いペースで過ごせていますね。でも、たまには思い切ってリフレッシュする時間を作るのも大切です。";
    return "頑張りすぎていませんか？たまには「NO」と言うことも大切です。リラックスする時間を意識的に作ってみましょう。";
  };

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">ストレスシミュレーター</CardTitle>
          <CardDescription className="text-center">あなたのストレス耐性をチェック！</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="あなたの名前を入力してください"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-center"
          />
          <Button onClick={handleStartGame} className="w-full">
            シミュレーション開始 <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameEnded) {
    const { name: characterName, emoji: characterEmoji } = getStressCharacter();
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">シミュレーション結果</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold">{playerName}さんのストレスレベル: {stress}%</p>
            <Progress value={stress} className="w-full mt-2" />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold text-lg">ストレス状態: {getStressLevel()}</p>
            <p className="text-6xl my-4">{characterEmoji}</p>
            <p className="font-semibold">あなたは『{characterName}』タイプです！</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">アドバイス</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{getAdvice()}</p>
            </CardContent>
          </Card>
          <Button onClick={resetGame} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> もう一度チャレンジ
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">ストレスシミュレーター</CardTitle>
        <CardDescription className="text-center">{playerName}さんの日常生活</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Activity className="text-yellow-500" />
          <Progress value={stress} className="w-full" />
          <span className="text-sm font-medium">{stress}%</span>
        </div>
        <p className="font-bold text-center">質問 {currentQuestion + 1}/10</p>
        <p className="text-center">{questions[currentQuestion].text}</p>
        {questions[currentQuestion].options.map((option, index) => (
          <Button 
            key={index} 
            onClick={() => handleAnswer(option)} 
            className="w-full"
            variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}
          >
            {option.text}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default StressSimulator;
