import { colors, componentNames } from "@/constants"

export const calculateComponents = (score: number) => {
  const componentColors = [colors.component1, colors.component2, colors.component3, colors.component4]

  if (score === 100) {
    return componentNames.map((name, index) => ({
      name,
      score: 25,
      color: componentColors[index]
    }))
  }

  let buildRelationshipsScore = 0
  let remainingScore = score

  if (score > 65) {
    buildRelationshipsScore = 25
    remainingScore -= 25
  } else if (score > 50) {
    buildRelationshipsScore = Math.max(17, Math.min(25, score - 33))
    remainingScore -= buildRelationshipsScore
  } else {
    buildRelationshipsScore = Math.max(5, Math.min(25, score / 4))
    remainingScore -= buildRelationshipsScore
  }

  const otherComponentsMinScore = score > 65 ? 11 : 5
  const otherComponentsMaxScore = 25

  let result = []
  for (let i = 0; i < 3; i++) {
    const maxPossible = Math.min(otherComponentsMaxScore, remainingScore - (2 - i) * otherComponentsMinScore)
    const componentScore = Math.max(otherComponentsMinScore, Math.min(maxPossible, Math.floor(Math.random() * (maxPossible - otherComponentsMinScore + 1)) + otherComponentsMinScore))
    result.push({
      name: componentNames[i],
      score: componentScore,
      color: componentColors[i]
    })
    remainingScore -= componentScore
  }

  result.push({
    name: 'Build relationships',
    score: buildRelationshipsScore,
    color: componentColors[3]
  })

  return result
}

export const calculateRanks = (score: number) => {
  let minRank, maxRank
  if (score > 85) {
    minRank = 1
    maxRank = 2
  } else if (score > 65) {
    minRank = 1
    maxRank = 5
  } else if (score > 50) {
    minRank = 5
    maxRank = 20
  } else if (score >= 30) {
    minRank = 20
    maxRank = 40
  } else {
    minRank = 40
    maxRank = 100
  }
  return {
    industryRank: Math.floor(Math.random() * (maxRank - minRank + 1)) + minRank,
    networkRank: Math.floor(Math.random() * (maxRank - minRank + 1)) + minRank
  }
}