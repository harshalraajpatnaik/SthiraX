import unittest
from feasibility_engine import RegionMetrics, ScoringWeights, FeasibilityEngine


class TestFeasibilityEngine(unittest.TestCase):

    def setUp(self):
        self.weights = ScoringWeights(
            co2_weight=0.25,
            cost_weight=0.20,
            feedstock_weight=0.20,
            plant_density_weight=0.15,
            demand_weight=0.20
        )
        self.hosur_metrics = RegionMetrics(
            region_id="reg-hosur",
            region_name="Bengaluru - Hosur Corridor",
            state="Karnataka / Tamil Nadu",
            co2_availability_score=90.0,
            delivered_co2_cost_score=85.0,
            feedstock_suitability_score=88.0,
            plant_density_score=92.0,
            construction_demand_score=95.0,
            notes="Optimal cluster for pilot launch"
        )

    def test_weights_validation(self):
        self.assertTrue(self.weights.validate())
        invalid_weights = ScoringWeights(co2_weight=0.5, cost_weight=0.6)
        self.assertFalse(invalid_weights.validate())

    def test_composite_scoring(self):
        result = FeasibilityEngine.calculate_score(self.hosur_metrics, self.weights)
        # 90*0.25 (22.5) + 85*0.20 (17.0) + 88*0.20 (17.6) + 92*0.15 (13.8) + 95*0.20 (19.0) = 89.90
        self.assertAlmostEqual(result["composite_score"], 89.90, places=1)
        self.assertEqual(result["rank_rating"], "Priority 1")
        self.assertIn("component_breakdown", result)

    def test_sensitivity_matrix(self):
        matrix = FeasibilityEngine.sensitivity_analysis(
            base_price_inr=3500.0,
            base_cost_inr=2600.0,
            price_variations_pct=[-5.0, 0.0, 5.0],
            cost_variations_pct=[-5.0, 0.0, 5.0]
        )
        self.assertEqual(len(matrix), 9)
        base_scenario = next(m for m in matrix if m["price_shift_pct"] == 0.0 and m["cost_shift_pct"] == 0.0)
        self.assertAlmostEqual(base_scenario["margin_inr"], 900.0, places=2)
        self.assertAlmostEqual(base_scenario["margin_pct"], 25.71, places=1)


if __name__ == "__main__":
    unittest.main()
