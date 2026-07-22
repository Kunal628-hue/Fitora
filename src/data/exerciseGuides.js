/**
 * Fitora Exercise Guides Database
 * Provides visual animation types, step-by-step instructions, breathing tips, and target muscle groups.
 */

export const EXERCISE_GUIDES = {
  'incline barbell press': {
    animation: 'press',
    muscles: ['Upper Chest', 'Front Deltoids', 'Triceps'],
    breathing: 'Inhale on the way down, exhale powerfully as you press the bar up.',
    steps: [
      'Lie back on an incline bench set to around 30-45 degrees.',
      'Grip the bar slightly wider than shoulder-width, unrack it, and hold it straight over your chest.',
      'Lower the bar slowly to your upper chest, keeping your elbows tucked at a 45-degree angle.',
      'Press the bar back up in a slight arc to the starting position.'
    ]
  },
  'weighted dips': {
    animation: 'press',
    muscles: ['Lower Chest', 'Triceps', 'Front Delts'],
    breathing: 'Inhale as you lower your body, exhale as you push yourself back up.',
    steps: [
      'Mount the dip bars, lock out your arms, and lean your torso slightly forward.',
      'Bend your elbows to lower your body until your shoulders are slightly below your elbows.',
      'Push through your palms to return to the starting position, squeezing your triceps at the top.'
    ]
  },
  'overhead press': {
    animation: 'press',
    muscles: ['Shoulders (Deltoids)', 'Triceps', 'Core'],
    breathing: 'Inhale to brace your core, exhale as you press the barbell overhead.',
    steps: [
      'Set the bar at chest height on a rack. Grip it slightly wider than shoulder-width.',
      'Unrack the bar, resting it on your upper chest/shoulders, and brace your abs and glutes.',
      'Press the bar straight up overhead, moving your head back slightly to let the bar pass your face.',
      'Lock out your arms at the top, pushing your head forward to look through the "window".'
    ]
  },
  'lateral raises': {
    animation: 'lateral',
    muscles: ['Lateral Deltoids (Side Shoulders)'],
    breathing: 'Exhale as you raise the weights, inhale as you lower them slowly.',
    steps: [
      'Stand tall holding dumbbells at your sides, palms facing inward.',
      'With a slight bend in your elbows, raise your arms out to the sides in a wide arc.',
      'Stop when your arms are parallel to the floor, holding for a split second.',
      'Lower the dumbbells back down under strict control.'
    ]
  },
  'weighted pull-ups': {
    animation: 'pull',
    muscles: ['Lats (Back)', 'Biceps', 'Rear Delts'],
    breathing: 'Inhale at the bottom, exhale as you pull your chest up to the bar.',
    steps: [
      'Hang from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width.',
      'Squeeze your shoulder blades together and pull your elbows down towards your ribs.',
      'Pull yourself up until your chin clears the bar.',
      'Lower yourself slowly back to a full dead hang position.'
    ]
  },
  'barbell rows': {
    animation: 'pull',
    muscles: ['Upper Back', 'Lats', 'Biceps', 'Lower Back'],
    breathing: 'Inhale to brace, exhale as you row the bar to your lower ribs/abdomen.',
    steps: [
      'Stand over a barbell, hinge forward at the hips at a 45-degree angle, keeping your back flat.',
      'Grip the bar overhand, pull it towards your lower ribs, keeping your elbows close to your body.',
      'Squeeze your back muscles at the peak of the movement.',
      'Lower the bar under control until your arms are fully extended.'
    ]
  },
  'lat pulldowns (wide)': {
    animation: 'pull',
    muscles: ['Lats (Wings)', 'Upper Back', 'Biceps'],
    breathing: 'Exhale as you pull the bar down, inhale as you let it slowly return.',
    steps: [
      'Sit at a pulldown station and adjust the knee pad. Grip the wide bar with an overhand grip.',
      'Pull the bar down toward your upper chest while leaning back slightly.',
      'Focus on squeezing your shoulder blades together at the bottom.',
      'Return the bar slowly to the starting position, stretching your lats.'
    ]
  },
  'incline dumbbell curls': {
    animation: 'curl',
    muscles: ['Biceps (Long Head)', 'Brachialis'],
    breathing: 'Exhale as you curl the dumbbells up, inhale as you lower them.',
    steps: [
      'Sit back on an incline bench set to 45 degrees, dumbbells hanging straight down.',
      'Keep your elbows pinned in place and curl the weights up towards your shoulders.',
      'Squeeze your biceps hard at the top, rotating your pinkies outward.',
      'Lower the weights slowly, maintaining the stretch in the biceps.'
    ]
  },
  'hanging leg raises': {
    animation: 'pull',
    muscles: ['Lower Abs', 'Hip Flexors', 'Grip Strength'],
    breathing: 'Exhale as you lift your legs, inhale as you lower them slowly.',
    steps: [
      'Hang from a pull-up bar with straight arms, bracing your core.',
      'Without swinging, raise your legs until they are parallel to the floor (or bend knees if needed).',
      'Pause at the top, contracting your abdominal muscles.',
      'Lower your legs slowly back to the starting position.'
    ]
  },
  'plank hold': {
    animation: 'plank',
    muscles: ['Core', 'Transverse Abdominis', 'Shoulders'],
    breathing: 'Maintain steady, shallow breathing throughout the hold.',
    steps: [
      'Place your forearms on the floor, elbows aligned under your shoulders.',
      'Extend your legs straight behind you, supporting your weight on your toes.',
      'Create a straight line from your head to your heels, squeezing your glutes and abs.',
      'Hold the position without letting your hips sag or rise.'
    ]
  },
  'russian twists': {
    animation: 'twist',
    muscles: ['Obliques (Side Abs)', 'Core'],
    breathing: 'Exhale as you twist to each side, inhale as you transition through the center.',
    steps: [
      'Sit on the floor, bend your knees, and lean your torso back at a 45-degree angle.',
      'Lift your feet slightly off the floor to balance on your sit bones.',
      'Clasp your hands (or hold a weight) and rotate your torso to touch the floor on your left side.',
      'Rotate back to the right side, keeping your core braced and legs stable.'
    ]
  },
  'zone 2 jog / incline walk': {
    animation: 'cardio',
    muscles: ['Cardiovascular System', 'Legs'],
    breathing: 'Breathe rhythmically. You should be able to maintain a full-sentence conversation.',
    steps: [
      'Set an incline on the treadmill (e.g. 5-8% at 4-5 km/h) or start a gentle, steady jog.',
      'Keep your heart rate at 60-70% of your maximum (conversational pace).',
      'Maintain upright posture and land softly on your feet.',
      'Continue steadily for 30 minutes to build aerobic base and recovery.'
    ]
  },
  'squats': {
    animation: 'squat',
    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Core'],
    breathing: 'Inhale deeply as you squat down, exhale forcefully as you drive back up.',
    steps: [
      'Rest the barbell on your upper back (traps) and stand with feet shoulder-width apart.',
      'Hinge at your hips and bend your knees to lower your body, keeping your chest upright.',
      'Squat down until your thighs are parallel to the floor or slightly lower.',
      'Drive through your heels to stand back up, keeping your knees pushed outward.'
    ]
  },
  'bench press': {
    animation: 'press',
    muscles: ['Chest (Pectorals)', 'Triceps', 'Shoulders'],
    breathing: 'Inhale as you lower the bar to your chest, exhale as you press it up.',
    steps: [
      'Lie flat on a bench, eyes directly under the bar. Grip the bar slightly wider than shoulders.',
      'Unrack the bar and hold it straight over your chest with locked elbows.',
      'Lower the bar slowly to your mid-chest, keeping your forearms vertical.',
      'Press the bar straight up, locking your elbows at the top.'
    ]
  },
  'deadlifts': {
    animation: 'deadlift',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Upper Back'],
    breathing: 'Inhale deeply at the bottom and brace your core, exhale at the top.',
    steps: [
      'Stand with your mid-foot under the barbell. Feet should be hip-width apart.',
      'Bend over and grab the bar with a shoulder-width grip, keeping your spine neutral.',
      'Lower your hips until your shins touch the bar, and flatten your back.',
      'Drive through your legs to stand up, pulling the bar close to your shins. Lock out your hips.'
    ]
  },
  'flat barbell bench press': {
    animation: 'press',
    muscles: ['Chest', 'Triceps', 'Front Delts'],
    breathing: 'Inhale on the way down, exhale as you press the bar away.',
    steps: [
      'Lie flat on the bench, feet flat on the floor. Grip the bar slightly wider than shoulders.',
      'Lower the bar slowly to your chest, keeping elbows at a 45-degree angle.',
      'Press the bar back up to starting position, keeping your shoulders retracted.'
    ]
  },
  'pendlay rows': {
    animation: 'pull',
    muscles: ['Upper Back', 'Lats', 'Core'],
    breathing: 'Exhale as you row the weight dynamically, inhale as you lower it back to the floor.',
    steps: [
      'Set the bar on the floor. Hinge at the hips until your torso is parallel to the ground.',
      'Grip the bar slightly wider than shoulder-width, keeping your back flat.',
      'Row the bar dynamically to your lower chest, keeping your torso completely still.',
      'Return the bar completely to the floor for a dead stop before the next rep.'
    ]
  },
  'incline dumbbell press': {
    animation: 'press',
    muscles: ['Upper Chest', 'Front Deltoids', 'Triceps'],
    breathing: 'Inhale as you lower the dumbbells to your chest, exhale as you press them up.',
    steps: [
      'Sit on an incline bench with dumbbells resting on your knees, then kick them up to your shoulders.',
      'Press the dumbbells straight up above your chest, palms facing forward.',
      'Lower them slowly until they are in line with your upper chest.',
      'Press back up, following a slight inward arc.'
    ]
  },
  'face pulls': {
    animation: 'pull',
    muscles: ['Rear Deltoids', 'Upper Back', 'Rotator Cuff'],
    breathing: 'Exhale as you pull the rope towards your face, inhale as you extend your arms.',
    steps: [
      'Set a cable pulley at upper-chest height with a rope attachment.',
      'Hold the rope ends with palms facing each other, step back to create tension.',
      'Pull the center of the rope towards your nose, pulling the ends apart to your ears.',
      'Lead with your knuckles, keeping your elbows high and squeezing your shoulder blades.'
    ]
  },
  'conventional deadlifts': {
    animation: 'deadlift',
    muscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Erectors'],
    breathing: 'Inhale and brace before the pull, exhale at lockout.',
    steps: [
      'Stand with shins 1 inch from the bar, feet hip-width apart.',
      'Hinge at hips, grip the bar, and pull your shins forward to touch the bar.',
      'Flatten your spine, engage your lats, and push the floor away to lift the weight.',
      'Stand tall, locking your hips and knees. Lower the bar with control.'
    ]
  },
  'bulgarian split squats': {
    animation: 'squat',
    muscles: ['Quads', 'Glutes', 'Hamstrings'],
    breathing: 'Inhale as you lower your body, exhale as you drive back up.',
    steps: [
      'Place one foot flat behind you on a bench or elevated platform.',
      'Step your other foot forward far enough so your knee doesn\'t pass your toes when squatting.',
      'Lower your hips until your back knee is a few inches off the floor.',
      'Drive through your front heel to return to standing.'
    ]
  },
  'hamstring curls': {
    animation: 'legcurl',
    muscles: ['Hamstrings (Biceps Femoris)'],
    breathing: 'Exhale as you curl your legs, inhale as you return to starting position.',
    steps: [
      'Lie face down on a leg curl bench, positioning the roller pad just below your calves.',
      'Hold the handles and curl your heels up towards your glutes as far as possible.',
      'Squeeze the hamstrings at the top for a second.',
      'Lower your legs slowly back to full extension.'
    ]
  },
  'standing calf raises': {
    animation: 'calf',
    muscles: ['Calves (Gastrocnemius, Soleus)'],
    breathing: 'Exhale at the top of the raise, inhale as you lower your heels.',
    steps: [
      'Stand on the edge of a step or platform on the balls of your feet.',
      'Lower your heels below the platform until you feel a deep stretch in your calves.',
      'Push through the balls of your feet to raise your heels as high as possible.',
      'Hold the peak contraction for a second, then lower slowly.'
    ]
  },
  'decompression hangs': {
    animation: 'hang',
    muscles: ['Spine Decompression', 'Lats', 'Forearms'],
    breathing: 'Breathe slowly and deeply, letting all muscle tension dissolve.',
    steps: [
      'Grab a pull-up bar with a shoulder-width grip.',
      'Let your body hang completely limp, allowing gravity to pull your spine down.',
      'Keep your shoulders relaxed, not actively pulling.',
      'Hold for the target duration, focusing on deep breathing.'
    ]
  },
  'hip opener flow': {
    animation: 'stretch_lunge',
    muscles: ['Hips', 'Glutes', 'Groin'],
    breathing: 'Slow, deep breaths. Exhale as you sink deeper into each pose.',
    steps: [
      'Perform a series of slow lunges, lizard stretches, and pigeon poses.',
      'Spend 1-2 minutes in each position, breathing deeply into tight areas.',
      'Keep your spine long and avoid forcing any joints past comfort.'
    ]
  },
  'thoracic spine extensions': {
    animation: 'stretch',
    muscles: ['Thoracic Spine (Upper/Mid Back)'],
    breathing: 'Inhale as you arch back over the roller, exhale as you relax.',
    steps: [
      'Lie on your back with a foam roller positioned under your mid-back.',
      'Support your head with your hands, keeping your elbows pointing forward.',
      'Gently arch your upper back over the roller while keeping your hips flat on the floor.',
      'Roll up or down slightly to target different vertebrae.'
    ]
  },
  'full body foam roll': {
    animation: 'stretch',
    muscles: ['Myofascial Release', 'All Muscles'],
    breathing: 'Breathe deeply and slowly, particularly when rolling over tender spots.',
    steps: [
      'Slowly roll the foam roller over major muscle groups (quads, lats, upper back, calves).',
      'Roll back and forth over a 2-4 inch area for 30-60 seconds.',
      'If you find a tender spot, push and hold pressure for 20 seconds to release it.'
    ]
  }
};
