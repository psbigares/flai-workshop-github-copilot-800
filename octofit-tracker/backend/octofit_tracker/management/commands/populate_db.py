from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes dedicated to fitness and strength',
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League members committed to peak physical performance',
        )

        # Create Marvel Users
        self.stdout.write('Creating Marvel heroes...')
        marvel_users = [
            User.objects.create(
                name='Iron Man',
                email='tony.stark@marvel.com',
                password='arc_reactor_3000',
                team_id=str(team_marvel._id)
            ),
            User.objects.create(
                name='Captain America',
                email='steve.rogers@marvel.com',
                password='shield_bearer',
                team_id=str(team_marvel._id)
            ),
            User.objects.create(
                name='Thor',
                email='thor.odinson@marvel.com',
                password='mjolnir_worthy',
                team_id=str(team_marvel._id)
            ),
            User.objects.create(
                name='Black Widow',
                email='natasha.romanoff@marvel.com',
                password='red_room_grad',
                team_id=str(team_marvel._id)
            ),
            User.objects.create(
                name='Hulk',
                email='bruce.banner@marvel.com',
                password='gamma_radiation',
                team_id=str(team_marvel._id)
            ),
        ]

        # Create DC Users
        self.stdout.write('Creating DC heroes...')
        dc_users = [
            User.objects.create(
                name='Superman',
                email='clark.kent@dc.com',
                password='krypton_survivor',
                team_id=str(team_dc._id)
            ),
            User.objects.create(
                name='Batman',
                email='bruce.wayne@dc.com',
                password='dark_knight',
                team_id=str(team_dc._id)
            ),
            User.objects.create(
                name='Wonder Woman',
                email='diana.prince@dc.com',
                password='amazonian_warrior',
                team_id=str(team_dc._id)
            ),
            User.objects.create(
                name='The Flash',
                email='barry.allen@dc.com',
                password='speed_force',
                team_id=str(team_dc._id)
            ),
            User.objects.create(
                name='Aquaman',
                email='arthur.curry@dc.com',
                password='king_of_atlantis',
                team_id=str(team_dc._id)
            ),
        ]

        all_users = marvel_users + dc_users

        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            Workout.objects.create(
                name='Super Strength Training',
                description='High-intensity strength training inspired by super soldiers',
                category='Strength',
                difficulty='Advanced',
                duration=45,
                calories_per_session=400
            ),
            Workout.objects.create(
                name='Speed Force Cardio',
                description='Lightning-fast cardio workout for maximum endurance',
                category='Cardio',
                difficulty='Intermediate',
                duration=30,
                calories_per_session=350
            ),
            Workout.objects.create(
                name='Amazonian Combat Training',
                description='Warrior-inspired combat and agility training',
                category='Combat',
                difficulty='Advanced',
                duration=60,
                calories_per_session=500
            ),
            Workout.objects.create(
                name='Web-Slinger Flexibility',
                description='Flexibility and mobility exercises for agile movements',
                category='Flexibility',
                difficulty='Beginner',
                duration=20,
                calories_per_session=150
            ),
            Workout.objects.create(
                name='Arc Reactor Core',
                description='Core strengthening exercises for ultimate stability',
                category='Core',
                difficulty='Intermediate',
                duration=25,
                calories_per_session=250
            ),
        ]

        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Swimming', 'Cycling', 'Weight Training', 'Boxing', 'Yoga']
        
        for user in all_users:
            # Create 5-10 random activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 90)
                calories = duration * random.randint(5, 12)
                distance = round(random.uniform(2, 15), 2) if activity_type in ['Running', 'Swimming', 'Cycling'] else None
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    calories_burned=calories,
                    distance=distance,
                    date=datetime.now() - timedelta(days=random.randint(0, 30))
                )

        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard...')
        leaderboard_data = []
        
        for user in all_users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_calories = sum(activity.calories_burned for activity in user_activities)
            total_activities = user_activities.count()
            
            team = team_marvel if user.team_id == str(team_marvel._id) else team_dc
            
            leaderboard_data.append({
                'user': user,
                'team': team,
                'total_calories': total_calories,
                'total_activities': total_activities
            })
        
        # Sort by total calories and assign ranks
        leaderboard_data.sort(key=lambda x: x['total_calories'], reverse=True)
        
        for rank, data in enumerate(leaderboard_data, start=1):
            Leaderboard.objects.create(
                user_id=str(data['user']._id),
                user_name=data['user'].name,
                team_id=str(data['team']._id),
                team_name=data['team'].name,
                total_calories=data['total_calories'],
                total_activities=data['total_activities'],
                rank=rank
            )

        # Create unique index on email field for users collection
        self.stdout.write('Creating unique index on email field...')
        from pymongo import MongoClient
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.create_index('email', unique=True)
        client.close()

        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
        self.stdout.write(f'Created {len(all_users)} users')
        self.stdout.write(f'Created 2 teams')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {len(workouts)} workouts')
        self.stdout.write(f'Created {Leaderboard.objects.count()} leaderboard entries')
